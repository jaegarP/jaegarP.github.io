/* =====================================================================
   CLOUD & DEVOPS — renders SITE.cloud (js/content.js): deployment cards,
   the capstone case study (pipeline, highlights, next steps) and the
   skills-evidence table. Also switches the architecture diagram views.
   The SVG diagrams themselves are written directly in index.html.
   ===================================================================== */

(() => {
  const C = (window.SITE || {}).cloud;
  if (!C) return;
  const $ = (id) => document.getElementById(id);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const link = (l, cls = "") =>
    `<a class="${cls}" href="${esc(l.url)}" ${l.url.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${esc(l.label)} →</a>`;

  /* ---------- deployment cards ---------- */
  $("deploys").innerHTML = C.deployments
    .map(
      (d) => `
      <article class="card deploy reveal">
        <div class="deploy__status deploy__status--${esc(d.status)}"><i></i>${esc(d.statusText)}</div>
        <h3>${esc(d.title)}</h3>
        <p class="deploy__where mono small">${esc(d.where)}</p>
        <p class="muted small">${esc(d.text)}</p>
        <div class="deploy__stack">${d.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        <div class="deploy__links">${d.links.map((l) => link(l, "mono small")).join("")}</div>
      </article>`
    )
    .join("");

  /* ---------- architecture view switcher ---------- */
  const arch = $("architecture");
  arch.addEventListener("click", (e) => {
    const btn = e.target.closest(".seg__btn");
    if (!btn) return;
    arch.querySelectorAll(".seg__btn").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    arch.querySelectorAll(".arch__view").forEach((v) => (v.hidden = v.dataset.view !== btn.dataset.view));
  });

  /* ---------- capstone case study ---------- */
  const cap = C.capstone;
  $("capstoneMeta").innerHTML = [cap.team, cap.result].filter(Boolean).map((t, i) => `<span class="chip ${i ? "chip--gold" : ""}">${esc(t)}</span>`).join("");
  if (cap.myRole) {
    const r = $("capstoneRole");
    r.innerHTML = `<b>My contribution:</b> ${esc(cap.myRole)}`;
    r.hidden = false;
  }
  $("pipeline").innerHTML = cap.pipeline
    .map((s, i) => `<li class="pipe"><span class="pipe__n">${i + 1}</span><b>${esc(s.title)}</b><span>${esc(s.text)}</span></li>`)
    .join("");
  $("capstoneHighlights").innerHTML = cap.highlights.map((h) => `<div class="cap-hl"><b>${esc(h.title)}</b><p>${esc(h.text)}</p></div>`).join("");
  $("capstoneNext").innerHTML = cap.nextSteps.map((n) => `<li>${esc(n)}</li>`).join("");
  $("capstoneRepo").href = cap.repo;

  /* ---------- skills evidence table ---------- */
  $("capabilities").innerHTML =
    `<thead><tr><th>Capability</th><th>Where it's demonstrated</th></tr></thead><tbody>` +
    C.capabilities.map((c) => `<tr><th scope="row">${esc(c.skill)}</th><td>${esc(c.evidence)}</td></tr>`).join("") +
    `</tbody>`;
})();
