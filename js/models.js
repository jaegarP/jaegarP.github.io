/* =====================================================================
   EQUITY RESEARCH MODELS — renders SITE.models (js/content.js) as cards:
   headline valuation, revenue chart (actuals vs forecast), DCF bridge,
   key assumptions and a download button for the .xlsx workbook.
   To add a model: drop the .xlsx in assets/models/ and copy one of the
   objects in `models` in content.js. Nothing in this file needs to change.
   ===================================================================== */

(() => {
  const S = window.SITE;
  const el = document.getElementById("models");
  if (!el || !S.models) return;

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const usd = (v) => "$" + v.toFixed(2);
  const bn = (v) => {
    const a = Math.abs(v);
    const s = a >= 1000 ? "$" + (a / 1000).toFixed(2) + "tn" : "$" + a.toFixed(1) + "bn";
    return (v < 0 ? "−" : "") + s;
  };
  const pct = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(1) + "%";

  /* ---------- revenue bar chart (SVG, themed by CSS) ---------- */
  function chart(m) {
    const W = 560, H = 210, padL = 8, padR = 8, padT = 26, padB = 26;
    const n = m.revenueBn.length;
    const max = Math.max(...m.revenueBn);
    const slot = (W - padL - padR) / n;
    const bw = Math.min(26, slot * 0.68);
    const y = (v) => padT + (H - padT - padB) * (1 - v / max);
    const bars = m.revenueBn
      .map((v, i) => {
        const x = padL + slot * i + (slot - bw) / 2;
        const fc = i >= m.actualYears;
        return `<rect class="mbar ${fc ? "mbar--fc" : ""}" x="${x.toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - padB - y(v)).toFixed(1)}" rx="3"><title>${esc(m.years[i])}: ${bn(v)}${fc ? " (forecast)" : ""}</title></rect>`;
      })
      .join("");
    // Label first, last-actual and last bars directly (no gridlines needed)
    const lbl = [0, m.actualYears - 1, n - 1]
      .map((i) => {
        const x = padL + slot * i + slot / 2;
        return `<text class="mlbl" x="${x.toFixed(1)}" y="${(y(m.revenueBn[i]) - 7).toFixed(1)}" text-anchor="middle">${bn(m.revenueBn[i])}</text>`;
      })
      .join("");
    const years = m.years
      .map((t, i) => (i % 2 === 0 || i === n - 1 ? `<text class="myr" x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(t)}</text>` : ""))
      .join("");
    const split = padL + slot * m.actualYears;
    return `<svg viewBox="0 0 ${W} ${H}" class="mchart" role="img" aria-label="${esc(m.company)} revenue, ${esc(m.years[0])} to ${esc(m.years[n - 1])}: ${m.actualYears} years actual, then forecast">
      <line class="msplit" x1="${split}" x2="${split}" y1="${padT - 14}" y2="${H - padB}" />
      <text class="myr" x="${split + 6}" y="${padT - 6}">forecast →</text>
      <line class="maxis" x1="${padL}" x2="${W - padR}" y1="${H - padB}" y2="${H - padB}" />
      ${bars}${lbl}${years}
    </svg>`;
  }

  el.innerHTML = S.models
    .map((m) => {
      const down = m.upsidePct < 0;
      return `
      <article class="card model reveal">
        <header class="model__head">
          <div>
            <h3>${esc(m.company)} <span class="model__ticker">${esc(m.ticker)}</span></h3>
            <p class="muted small">${esc(m.sector)} · valued at ${esc(m.valuationDate)}</p>
          </div>
          <a class="btn btn--primary btn--small" href="${esc(m.file)}" download>Download .xlsx ↓</a>
        </header>

        <div class="model__kpis">
          <div class="kpi kpi--main"><div class="kpi__label">DCF value / share</div><div class="kpi__value">${usd(m.valuePerShare)}</div></div>
          <div class="kpi"><div class="kpi__label">Market price</div><div class="kpi__value">${usd(m.price)}</div><div class="kpi__sub">${esc(m.priceDate)}</div></div>
          <div class="kpi"><div class="kpi__label">Implied ${down ? "downside" : "upside"}</div><div class="kpi__value ${down ? "is-neg" : "is-pos"}">${pct(m.upsidePct)}</div></div>
          <div class="kpi"><div class="kpi__label">WACC</div><div class="kpi__value">${m.waccPct.toFixed(2)}%</div></div>
        </div>

        <div class="model__chart">
          <div class="lab__chart-head">
            <h4>Revenue, US$</h4>
            <div class="legend"><span><i class="sw sw--a"></i>Actual</span><span><i class="sw sw--fc"></i>Base-case forecast</span></div>
          </div>
          ${chart(m)}
        </div>

        <p class="model__take">${esc(m.take)}</p>

        <details class="model__more">
          <summary>DCF bridge &amp; key assumptions</summary>
          <div class="model__grid">
            <table class="bridge">
              ${m.bridge.map((b) => `<tr class="${b.total ? "is-total" : ""}"><td>${esc(b.label)}</td><td>${bn(b.value)}</td></tr>`).join("")}
              <tr><td>÷ ${esc(m.shares)}</td><td></td></tr>
              <tr class="is-total is-final"><td>Value per share</td><td>${usd(m.valuePerShare)}</td></tr>
            </table>
            <ul class="model__assump">${m.assumptions.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
          </div>
        </details>
      </article>`;
    })
    .join("");
})();
