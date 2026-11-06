/* =====================================================================
   MAIN — renders content.js into the page and wires up interactions.
   ---------------------------------------------------------------------
   Sections:
     1. Helpers
     2. Simple text bindings  (data-bind="path.to.value" in index.html)
     3. Hero (rotator, socials, stats counters)
     4. About
     5. Projects + filters + modal
     6. Experience timeline
     7. Skills
     8. Education
     9. Contact
    10. Nav, theme toggle, scroll effects
   ===================================================================== */

(() => {
  const S = window.SITE;
  const icon = window.ICONS;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- 1. Helpers ---------- */
  const get = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const catLabel = (id) => (S.projectCategories.find((c) => c.id === id) || {}).label || id;
  const catIcon = { finance: "finance", ai: "ai", cloud: "cloud", research: "research" };

  /* ---------- 2. Text bindings ---------- */
  document.title = S.meta.title;
  $('meta[name="description"]').setAttribute("content", S.meta.description);
  $$("[data-bind]").forEach((el) => {
    const v = get(S, el.dataset.bind);
    if (v !== undefined) el.textContent = v;
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- 3. Hero ---------- */
  // Typewriter word rotator
  (function rotator() {
    const el = $("#heroRotator");
    const words = S.person.rotatingWords;
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);
      let delay = deleting ? 40 : 75;
      if (!deleting && ci === word.length) { deleting = true; delay = 1800; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    };
    tick();
  })();

  // Resume button
  const resumeBtn = $("#resumeBtn");
  if (S.person.resumeUrl) resumeBtn.href = S.person.resumeUrl;
  else resumeBtn.remove();

  // Social icons
  $("#heroSocials").innerHTML = S.person.socials
    .map((s) => `<a class="icon-btn" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.icon)}</a>`)
    .join("");

  // Stats with count-up animation
  $("#stats").innerHTML = S.stats
    .map((s) => `<div class="stat reveal"><div class="stat__value"><b data-count="${s.value}">0</b><span>${esc(s.suffix)}</span></div><p class="stat__label">${esc(s.label)}</p></div>`)
    .join("");

  function countUp(el) {
    const target = +el.dataset.count, dur = 1600, t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- 4. About ---------- */
  $("#aboutParas").innerHTML = S.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#aboutHighlights").innerHTML = S.about.highlights
    .map((h) => `<div class="card hl reveal"><div class="hl__icon">${icon(h.icon)}</div><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>`)
    .join("");

  /* ---------- 5. Projects ---------- */
  const projects = S.projects
    .filter((p) => p.published !== false)
    .sort((a, b) => (b.featured === true) - (a.featured === true)); // featured first

  $("#filters").innerHTML = S.projectCategories
    .map((c) => {
      const n = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
      if (!n) return "";
      return `<button class="filter ${c.id === "all" ? "is-active" : ""}" data-filter="${c.id}" role="tab">${esc(c.label)}<span class="filter__count">${n}</span></button>`;
    })
    .join("");

  $("#projects").innerHTML = projects
    .map(
      (p, i) => `
      <article class="project reveal ${p.featured ? "project--featured" : ""}" data-cat="${p.category}" data-index="${i}" tabindex="0" role="button" aria-haspopup="dialog">
        <div class="project__top">
          <span class="project__cat">${icon(catIcon[p.category] || "star")} ${esc(catLabel(p.category))}</span>
          <span class="project__year">${esc(p.year)}</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <p class="project__org">${esc(p.org)}</p>
        <p class="project__summary">${esc(p.summary)}</p>
        <div class="project__foot">
          <div class="project__metric"><strong>${esc(p.metric?.value || "")}</strong><span>${esc(p.metric?.label || "")}</span></div>
          <span class="project__more">Details →</span>
        </div>
      </article>`
    )
    .join("");

  // Filtering
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    $$(".project").forEach((card) => card.classList.toggle("is-hidden", f !== "all" && card.dataset.cat !== f));
  });

  // Modal
  const modal = $("#projectModal");
  $("#projects").addEventListener("click", (e) => {
    const card = e.target.closest(".project");
    if (!card) return;
    const p = projects[+card.dataset.index];
    $("#modalBody").innerHTML = `
      <p class="section__kicker" style="color:var(--cat-${p.category})">${esc(catLabel(p.category))} · ${esc(p.year)}</p>
      <h3>${esc(p.title)}</h3>
      <p class="muted">${esc(p.org)}</p>
      <p>${esc(p.summary)}</p>
      <ul>${(p.details || []).map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      <div class="chips">${(p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      ${p.links?.length ? `<div class="modal__links">${p.links.map((l) => `<a class="btn btn--primary btn--small" href="${esc(l.url)}" ${l.url.startsWith("#") ? "data-close" : 'target="_blank" rel="noopener"'}>${esc(l.label)} →</a>`).join("")}</div>` : ""}`;
    modal.showModal();
  });
  // Keyboard: Enter / Space opens a focused card
  $("#projects").addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("project")) {
      e.preventDefault();
      e.target.click();
    }
  });
  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    const r = modal.getBoundingClientRect();
    const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (outside || e.target.closest("[data-close]")) modal.close(); // backdrop click or in-page link
  });

  /* ---------- 6. Experience ---------- */
  $("#timeline").innerHTML = S.experience
    .map(
      (x) => `
      <li class="tl reveal"><div class="card">
        <div class="tl__head"><h3>${esc(x.role)}</h3><span class="tl__period">${esc(x.period)}</span></div>
        <div class="tl__org">${esc(x.org)}</div>
        <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div></li>`
    )
    .join("");

  /* ---------- 7. Skills ---------- */
  $("#skillGroups").innerHTML = S.skillGroups
    .map(
      (g) => `
      <div class="card skill-group reveal">
        <h3>${icon(g.icon)} ${esc(g.title)}</h3>
        ${g.skills
          .map((s) => `<div class="skill"><div class="skill__head"><span>${esc(s.name)}</span><span>${s.level}%</span></div><div class="skill__bar"><div class="skill__fill" data-level="${s.level}"></div></div></div>`)
          .join("")}
      </div>`
    )
    .join("");
  $("#skillChips").innerHTML = S.skillChips.map((c) => `<span class="chip">${esc(c)}</span>`).join("");

  /* ---------- 8. Education ---------- */
  $("#education-list").innerHTML = S.education
    .map(
      (e) => `
      <div class="card edu__item reveal">
        <div class="edu__icon">${icon("cap")}</div>
        <div><h3>${esc(e.title)}</h3><p class="edu__org">${esc(e.org)}</p><p class="edu__period">${esc(e.period)}</p><p class="edu__note">${esc(e.note)}</p></div>
      </div>`
    )
    .join("");

  /* ---------- 9. Contact ---------- */
  const P = S.person;
  const contactItems = [
    `<li><a href="mailto:${esc(P.email)}">${icon("mail")} ${esc(P.email)}</a></li>`,
    P.showPhone ? `<li><a href="tel:${esc(P.phone.replace(/\s/g, ""))}">${icon("phone")} ${esc(P.phone)}</a></li>` : "",
    `<li><span>${icon("pin")} ${esc(P.location)}</span></li>`,
    ...P.socials.filter((s) => s.icon !== "mail").map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.icon)} ${esc(s.label)}</a></li>`),
  ];
  $("#contactList").innerHTML = contactItems.join("");

  // Opens the visitor's email client with a pre-filled message
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${P.email}?subject=${subject}&body=${body}`;
    $("#contactStatus").textContent = "Opening your email app… if nothing happens, email me directly at " + P.email;
  });

  /* ---------- 10. Nav, theme, scroll ---------- */
  // Theme toggle (remembers choice)
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const setTheme = (t) => {
    root.dataset.theme = t;
    themeBtn.innerHTML = icon(t === "dark" ? "sun" : "moon");
    try { localStorage.setItem("theme", t); } catch {}
    document.dispatchEvent(new Event("themechange"));
  };
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}
  setTheme(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Mobile menu
  const burger = $("#navBurger"), links = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", false); }
  });

  // Nav background on scroll
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight current section in nav
  const navLinks = $$('.nav__links a[href^="#"]');
  const sectionObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((sec) => sectionObserver.observe(sec));

  // Reveal-on-scroll + counters + skill bars
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-visible");
        $$("[data-count]", el).forEach(countUp);
        $$(".skill__fill", el).forEach((b) => (b.style.width = b.dataset.level + "%"));
        revealObserver.unobserve(el);
      }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealObserver.observe(el);
  });
})();
