# vibe-sait: сборка сайтов

- `template/` — общий шаблон (`index.html`, `app.js`, `styles.css`), рендерит сайт из `config.js`.
- `sites/<slug>/` — один сайт: `config.js` и `img/`. Файлы сайта перекрывают шаблон.
- `dist/<slug>/` — результат сборки.

```
npm run build            # все сайты
node scripts/build.mjs sto-pochinok
npm run build:publish    # боевая сборка (убирает теги data-publish, т.е. noindex)
```

Новый сайт: скопировать `sites/sto-pochinok` в `sites/<новый-slug>` и поправить `config.js`.
Деплой: GitHub Actions публикует `dist/` на Pages при пуше в `main`
(Settings → Pages → Source: GitHub Actions). Адрес: `https://<user>.github.io/<repo>/<slug>/`.
