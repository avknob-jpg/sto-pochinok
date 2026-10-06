// Рендер сайта из window.SITE (config.js). Под клиента этот файл обычно не меняется.
(() => {
  const S = window.SITE;
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const has = (a) => Array.isArray(a) && a.length > 0;
  const tel = S.phone.replace(/[^\d+]/g, "");

  const ICONS = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    oil: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    brake: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M16.5 4.2A9 9 0 0 1 20.8 10"/>',
    tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    engine: '<path d="M5 9h3l2-3h5v3h3l2 2v5h-2v2h-8l-2-2H5z"/><path d="M2 11v4M5 12h0"/>',
    diagnostics: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    suspension: '<path d="M8 3h8M8 21h8M8 6l8 2-8 2 8 2-8 2 8 2-8 2"/>',
    ac: '<path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2"/>',
    electric: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    body: '<path d="M3 16v-4l2-5h14l2 5v4z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><path d="M3 12h18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    tag: '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    coffee: '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const icon = (n, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.wrench}</svg>`;
  const stars = (n = 5) => "★".repeat(n) + "☆".repeat(5 - n);

  const nav = [
    has(S.services) && ["#services", "Услуги и цены"],
    has(S.advantages) && ["#why", "Почему мы"],
    has(S.reviews) && ["#reviews", "Отзывы"],
    ["#contacts", "Контакты"],
  ].filter(Boolean);

  const section = (id, title, body, extra = "") =>
    `<section id="${id}" class="section ${extra}"><div class="wrap"><h2 class="h2">${title}</h2>${body}</div></section>`;

  const html = `
${S.demoBanner ? `<div class="demo">Демо-версия сайта: цены и отзывы — пример, заменим на ваши</div>` : ""}
<header class="top">
  <div class="wrap top__in">
    <a href="#" class="logo"><span class="logo__mark">${esc(S.logoText)}</span><span><b>${esc(S.name)}</b><small>${esc(S.tagline)}</small></span></a>
    <nav class="nav">${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</nav>
    <a class="btn btn--ghost top__phone" href="tel:${tel}">${icon("phone")}<span>${esc(S.phone)}</span></a>
  </div>
</header>

<main>
<section class="hero">
  <div class="wrap hero__in">
    <div class="hero__text">
      <p class="eyebrow">${esc(S.hero.eyebrow)}</p>
      <h1 class="h1">${esc(S.hero.title)}</h1>
      <p class="lead">${esc(S.hero.subtitle)}</p>
      <div class="cta">
        <a class="btn btn--accent" href="#booking">Записаться ${icon("arrow")}</a>
        <a class="btn btn--ghost" href="tel:${tel}">${icon("phone")} Позвонить</a>
      </div>
      ${has(S.hero.badges) ? `<ul class="badges">${S.hero.badges.map((b) => `<li>${icon("check")}${esc(b)}</li>`).join("")}</ul>` : ""}
    </div>
    <div class="hero__card ${S.hero.image ? "hero__card--img" : ""}" ${S.hero.image ? `style="background-image:url('${esc(S.hero.image)}')"` : ""}>
      ${S.rating ? `<div class="rating"><span class="rating__v">${esc(S.rating.value)}</span><span><span class="stars">★★★★★</span><small>${esc(S.rating.count)} отзывов на ${esc(S.rating.source)}</small></span></div>` : ""}
      <div class="hero__info">
        <p>${icon("pin")}<span>${esc(S.city)}, ${esc(S.address)}</span></p>
        <p>${icon("clock")}<span>${S.hours.map(([d, h]) => `${esc(d)}: ${esc(h)}`).join("<br>")}</span></p>
      </div>
      ${has(S.stats) ? `<div class="stats">${S.stats.map((s) => `<div><b>${esc(s.value)}</b><small>${esc(s.label)}</small></div>`).join("")}</div>` : ""}
    </div>
  </div>
</section>

${has(S.services) ? section("services", "Услуги и цены", `
  <div class="grid grid--services">${S.services.map((s) => `
    <article class="card service">
      ${icon(s.icon, "ic ic--lg")}
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.desc)}</p>
      <div class="service__foot"><span class="price">${esc(s.price)}</span><a href="#booking" data-service="${esc(s.title)}" class="link">Записаться</a></div>
    </article>`).join("")}
  </div>
  <p class="note">Точную стоимость назовём после диагностики и согласуем с вами до начала работ.</p>`) : ""}

${has(S.advantages) ? section("why", "Почему выбирают нас", `
  <div class="grid grid--4">${S.advantages.map((a) => `
    <div class="adv">${icon(a.icon, "ic ic--lg")}<h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div>`).join("")}
  </div>`, "section--alt") : ""}

${has(S.steps) ? section("steps", "Как проходит ремонт", `
  <ol class="steps">${S.steps.map((s, i) => `
    <li><span class="steps__n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}
  </ol>`) : ""}

${has(S.brands) ? `<section class="brands"><div class="wrap"><p class="brands__t">Обслуживаем все популярные марки</p><div class="brands__row">${S.brands.map((b) => `<span>${esc(b)}</span>`).join("")}</div></div></section>` : ""}

${has(S.photos) ? section("photos", "Наш сервис", `<div class="gallery">${S.photos.map((p) => `<img src="${esc(p)}" alt="Фото автосервиса ${esc(S.name)}" loading="lazy">`).join("")}</div>`) : ""}

${has(S.reviews) ? section("reviews", "Отзывы клиентов", `
  <div class="grid grid--3">${S.reviews.map((r) => `
    <figure class="card review"><div class="stars">${stars(r.rating)}</div><blockquote>${esc(r.text)}</blockquote><figcaption><b>${esc(r.name)}</b> · ${esc(r.car)}</figcaption></figure>`).join("")}
  </div>`, "section--alt") : ""}

<section id="booking" class="section">
  <div class="wrap book">
    <div>
      <h2 class="h2">Запись на ремонт</h2>
      <p class="lead">Оставьте заявку, и мастер перезвонит в течение 15 минут в рабочее время.</p>
      <form class="form" id="form">
        <label>Имя<input name="name" required autocomplete="name" placeholder="Как к вам обращаться"></label>
        <label>Телефон<input name="phone" required type="tel" autocomplete="tel" placeholder="+7"></label>
        <label>Автомобиль<input name="car" placeholder="Марка, модель, год"></label>
        <label>Услуга<select name="service"><option value="">Не знаю, нужна диагностика</option>${(S.services || []).map((s) => `<option>${esc(s.title)}</option>`).join("")}</select></label>
        <label class="form__wide">Что беспокоит<textarea name="comment" rows="3" placeholder="Например: стук спереди справа на кочках"></textarea></label>
        <button class="btn btn--accent form__wide" type="submit">Отправить заявку ${icon("arrow")}</button>
        <p class="form__hint form__wide" id="form-hint"></p>
      </form>
    </div>
    <aside id="contacts" class="card contacts">
      <h3>Контакты</h3>
      <a class="contacts__phone" href="tel:${tel}">${esc(S.phone)}</a>
      <p>${icon("pin")}<span>${esc(S.city)}, ${esc(S.address)}</span></p>
      <p>${icon("clock")}<span>${S.hours.map(([d, h]) => `${esc(d)}: ${esc(h)}`).join("<br>")}</span></p>
      <div class="msgr">
        ${S.whatsapp ? `<a class="btn btn--ghost" href="https://wa.me/${esc(S.whatsapp)}" target="_blank" rel="noopener">${icon("chat")} WhatsApp</a>` : ""}
        ${S.telegram ? `<a class="btn btn--ghost" href="https://t.me/${esc(S.telegram)}" target="_blank" rel="noopener">${icon("chat")} Telegram</a>` : ""}
        ${S.max ? `<a class="btn btn--ghost" href="${esc(S.max)}" target="_blank" rel="noopener">${icon("chat")} Max</a>` : ""}
      </div>
      ${S.map ? `<iframe class="map" title="Карта" loading="lazy" src="https://yandex.ru/map-widget/v1/?${S.map.query ? `mode=search&text=${encodeURIComponent(S.map.query)}&z=${S.map.zoom || 16}` : `ll=${S.map.lon},${S.map.lat}&z=${S.map.zoom || 16}&pt=${S.map.lon},${S.map.lat},pm2rdm`}"></iframe>` : ""}
    </aside>
  </div>
</section>

${has(S.faq) ? section("faq", "Частые вопросы", `
  <div class="faq">${S.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>`, "section--alt") : ""}
</main>

<footer class="foot">
  <div class="wrap foot__in">
    <span>© ${new Date().getFullYear()} ${esc(S.name)} · ${esc(S.city)}</span>
    <a href="tel:${tel}">${esc(S.phone)}</a>
  </div>
</footer>

<div class="mbar">
  <a class="btn btn--ghost" href="tel:${tel}">${icon("phone")} Позвонить</a>
  <a class="btn btn--accent" href="#booking">Записаться</a>
</div>`;

  document.documentElement.dataset.theme = S.theme || "garage";
  document.title = S.seo?.title || S.name;
  document.querySelector('meta[name="description"]').content = S.seo?.description || "";
  document.getElementById("app").innerHTML = html;

  // Schema.org для поисковиков
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: S.name,
    telephone: S.phone,
    address: { "@type": "PostalAddress", addressLocality: S.city, streetAddress: S.address },
    geo: S.map && S.map.lat && { "@type": "GeoCoordinates", latitude: S.map.lat, longitude: S.map.lon },
  });
  document.head.appendChild(ld);

  // «Записаться» у услуги — подставляет её в форму
  const form = document.getElementById("form");
  document.querySelectorAll("[data-service]").forEach((a) =>
    a.addEventListener("click", () => (form.service.value = a.dataset.service))
  );

  // Заявка уходит в мессенджер владельца, без бэкенда
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const text = [
      `Заявка с сайта ${S.name}`,
      `Имя: ${f.name}`,
      `Телефон: ${f.phone}`,
      f.car && `Авто: ${f.car}`,
      `Услуга: ${f.service || "диагностика"}`,
      f.comment && `Комментарий: ${f.comment}`,
    ].filter(Boolean).join("\n");
    const hint = document.getElementById("form-hint");
    if (S.bookingChannel === "whatsapp" && S.whatsapp) {
      window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
      hint.textContent = "Откроется WhatsApp с готовым сообщением, осталось нажать «Отправить».";
    } else if (S.bookingChannel === "telegram" && S.telegram) {
      navigator.clipboard?.writeText(text);
      window.open(`https://t.me/${S.telegram}`, "_blank");
      hint.textContent = "Текст заявки скопирован, вставьте его в чат Telegram.";
    } else {
      location.href = `tel:${tel}`;
    }
  });
})();
