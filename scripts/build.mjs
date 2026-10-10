#!/usr/bin/env node
// Сборка сайтов: template/ + sites/<slug>/ -> dist/<slug>/
// Использование:
//   node scripts/build.mjs              собрать все сайты
//   node scripts/build.mjs <slug> ...   собрать выбранные
//   PUBLISH=1 node scripts/build.mjs    боевая сборка: убрать теги с атрибутом data-publish (noindex)
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [template, sitesDir, dist] = ["template", "sites", "dist"].map((d) => join(root, d));
const publish = process.env.PUBLISH === "1";

const all = readdirSync(sitesDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(sitesDir, e.name, "config.js")))
  .map((e) => e.name);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : all;
const unknown = slugs.filter((s) => !all.includes(s));
if (unknown.length) {
  console.error(`Нет такого сайта: ${unknown.join(", ")}. Доступны: ${all.join(", ") || "(пусто)"}`);
  process.exit(1);
}

if (slugs.length === all.length) rmSync(dist, { recursive: true, force: true });
for (const slug of slugs) {
  const out = join(dist, slug);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(template, out, { recursive: true });
  cpSync(join(sitesDir, slug), out, { recursive: true }); // config.js и img/ сайта; перекрывают шаблон
  writeFileSync(join(out, ".nojekyll"), "");
  if (publish) {
    const f = join(out, "index.html");
    const html = readFileSync(f, "utf8").split("\n").filter((l) => !l.includes("data-publish")).join("\n");
    writeFileSync(f, html);
  }
  console.log(`✓ ${slug} -> dist/${slug}/${publish ? " (publish)" : ""}`);
}

// Индекс со списком сайтов (удобно для предпросмотра)
if (slugs.length === all.length) {
  const li = all.map((s) => `<li><a href="${s}/">${s}</a></li>`).join("");
  writeFileSync(join(dist, "index.html"), `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Сайты</title><ul>${li}</ul>`);
  writeFileSync(join(dist, ".nojekyll"), "");
}
