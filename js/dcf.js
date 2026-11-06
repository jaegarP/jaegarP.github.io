/* =====================================================================
   DCF MODEL LAB — a small, transparent discounted-cash-flow model.
   ---------------------------------------------------------------------
   • INPUTS defines every slider (label, default, min, max, step).
     Add/remove entries here and the UI updates automatically.
   • runDCF() holds all the maths — read it like a spreadsheet.
   • Values are in millions of the selected currency.
   ===================================================================== */

(() => {
  const INPUTS = [
    { id: "revenue", label: "Base-year revenue (m)", value: 100, min: 10, max: 1000, step: 10, fmt: "money" },
    { id: "growth", label: "Revenue growth p.a.", value: 12, min: 0, max: 40, step: 0.5, fmt: "pct" },
    { id: "margin", label: "EBITDA margin", value: 25, min: 0, max: 60, step: 0.5, fmt: "pct" },
    { id: "da", label: "D&A (% of revenue)", value: 4, min: 0, max: 15, step: 0.5, fmt: "pct" },
    { id: "capex", label: "Capex (% of revenue)", value: 6, min: 0, max: 25, step: 0.5, fmt: "pct" },
    { id: "nwc", label: "NWC (% of Δ revenue)", value: 10, min: 0, max: 40, step: 1, fmt: "pct" },
    { id: "tax", label: "Tax rate", value: 30, min: 0, max: 45, step: 1, fmt: "pct" },
    { id: "wacc", label: "WACC", value: 14, min: 5, max: 30, step: 0.25, fmt: "pct" },
    { id: "tg", label: "Terminal growth", value: 4, min: 0, max: 8, step: 0.25, fmt: "pct" },
  ];
  const YEARS = 5;

  const $ = (id) => document.getElementById(id);
  const slidersEl = $("dcfSliders");
  if (!slidersEl) return;

  const state = {};
  let currency = "$";

  /* ---------- formatting helpers ---------- */
  const fmtMoney = (v) => {
    const abs = Math.abs(v);
    const s = abs >= 1000 ? (abs / 1000).toFixed(2) + "bn" : abs.toFixed(abs >= 100 ? 0 : 1) + "m";
    return (v < 0 ? "−" : "") + currency + s;
  };
  const fmtPct = (v) => `${parseFloat((+v).toFixed(2))}%`;
  const fmt = (v, kind) => (kind === "money" ? fmtMoney(v) : fmtPct(v));

  /* ---------- the model ---------- */
  function runDCF(p) {
    const g = p.growth / 100, m = p.margin / 100, da = p.da / 100, cx = p.capex / 100;
    const nwc = p.nwc / 100, t = p.tax / 100, r = p.wacc / 100, tg = p.tg / 100;

    let prevRev = p.revenue;
    const rows = [];
    for (let y = 1; y <= YEARS; y++) {
      const rev = prevRev * (1 + g);
      const ebitda = rev * m;
      const dep = rev * da;
      const ebit = ebitda - dep;
      const nopat = ebit * (1 - t);
      const capex = rev * cx;
      const dNwc = (rev - prevRev) * nwc;
      const fcf = nopat + dep - capex - dNwc;
      const df = 1 / Math.pow(1 + r, y);          // discount factor
      rows.push({ year: y, rev, ebitda, fcf, pv: fcf * df });
      prevRev = rev;
    }

    const pvFcf = rows.reduce((s, x) => s + x.pv, 0);
    const last = rows[rows.length - 1];
    const valid = r > tg;
    const tv = valid ? (last.fcf * (1 + tg)) / (r - tg) : NaN;   // Gordon growth
    const pvTv = tv / Math.pow(1 + r, YEARS);
    const ev = pvFcf + pvTv;
    return { rows, pvFcf, tv, pvTv, ev, valid, tvShare: pvTv / ev, evEbitda: ev / last.ebitda };
  }

  /* ---------- build sliders ---------- */
  function buildSliders() {
    slidersEl.innerHTML = INPUTS.map(
      (i) => `
      <div class="slider">
        <div class="slider__head">
          <label for="in-${i.id}">${i.label}</label>
          <output id="out-${i.id}"></output>
        </div>
        <input type="range" id="in-${i.id}" min="${i.min}" max="${i.max}" step="${i.step}" value="${i.value}" />
      </div>`
    ).join("");

    INPUTS.forEach((i) => {
      state[i.id] = i.value;
      $(`in-${i.id}`).addEventListener("input", (e) => {
        state[i.id] = parseFloat(e.target.value);
        render();
      });
    });
  }

  /* ---------- KPI tiles ---------- */
  function renderKpis(res) {
    const tiles = res.valid
      ? [
          { label: "Enterprise value", value: fmtMoney(res.ev), main: true },
          { label: "PV of FCF (5y)", value: fmtMoney(res.pvFcf) },
          { label: "PV terminal value", value: `${(res.tvShare * 100).toFixed(0)}% of EV` },
          { label: "Implied EV / EBITDA", value: `${res.evEbitda.toFixed(1)}x` },
        ]
      : [{ label: "Check inputs", value: "WACC must exceed terminal growth", main: true }];
    $("dcfKpis").innerHTML = tiles
      .map((k) => `<div class="kpi ${k.main ? "kpi--main" : ""}"><div class="kpi__label">${k.label}</div><div class="kpi__value">${k.value}</div></div>`)
      .join("");
  }

  /* ---------- SVG bar chart ---------- */
  function renderChart(res) {
    const el = $("dcfChart");
    const W = el.clientWidth || 600, H = el.clientHeight || 260;
    const pad = { t: 16, r: 8, b: 28, l: 56 };
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;

    const vals = res.rows.flatMap((r) => [r.fcf, r.pv]);
    const max = Math.max(0, ...vals) * 1.15 || 1;
    const min = Math.min(0, ...vals) * 1.15;
    const y = (v) => pad.t + ((max - v) / (max - min)) * ih;
    const band = iw / res.rows.length;
    const bw = Math.min(28, band * 0.3);

    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Projected free cash flow by year">`;
    // gridlines
    for (let i = 0; i <= 4; i++) {
      const v = min + ((max - min) * i) / 4;
      svg += `<line class="axis" x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}" stroke-dasharray="3 4"/>`;
      svg += `<text x="${pad.l - 8}" y="${y(v) + 4}" text-anchor="end">${fmtMoney(v)}</text>`;
    }
    svg += `<line class="axis" x1="${pad.l}" x2="${W - pad.r}" y1="${y(0)}" y2="${y(0)}" />`;
    // bars
    res.rows.forEach((r, i) => {
      const cx = pad.l + band * i + band / 2;
      [[r.fcf, "var(--accent)", -bw - 2], [r.pv, "var(--accent-2)", 2]].forEach(([v, c, off]) => {
        const top = Math.min(y(v), y(0)), hgt = Math.abs(y(v) - y(0));
        svg += `<rect class="bar" x="${cx + off}" y="${top}" width="${bw}" height="${Math.max(hgt, 1)}" rx="4" fill="${c}"><title>Year ${r.year}: ${fmtMoney(v)}</title></rect>`;
      });
      svg += `<text x="${cx}" y="${H - 8}" text-anchor="middle">Y${r.year}</text>`;
    });
    svg += `</svg>`;
    el.innerHTML = svg;
  }

  /* ---------- Sensitivity table (WACC rows × g columns) ---------- */
  function renderSensitivity(base) {
    const waccSteps = [-2, -1, 0, 1, 2].map((d) => state.wacc + d);
    const gSteps = [-1, -0.5, 0, 0.5, 1].map((d) => Math.max(0, state.tg + d));
    const grid = waccSteps.map((w) => gSteps.map((g) => runDCF({ ...state, wacc: w, tg: g })));
    const evs = grid.flat().filter((r) => r.valid).map((r) => r.ev);
    const lo = Math.min(...evs), hi = Math.max(...evs);

    let html = `<thead><tr><th></th>${gSteps.map((g) => `<th>g ${fmtPct(g)}</th>`).join("")}</tr></thead><tbody>`;
    grid.forEach((row, ri) => {
      html += `<tr><th>${fmtPct(waccSteps[ri])}</th>`;
      row.forEach((r, ci) => {
        const isBase = ri === 2 && ci === 2;
        if (!r.valid) return (html += `<td class="muted">n/a</td>`);
        // shade: teal above the base case, red below
        const diff = r.ev - base.ev;
        const span = diff >= 0 ? hi - base.ev : base.ev - lo;
        const alpha = span ? Math.min(Math.abs(diff) / span, 1) * 0.45 : 0;
        const col = diff >= 0 ? "45,212,191" : "244,63,94";
        html += `<td class="${isBase ? "is-base" : ""}" style="background:rgba(${col},${alpha.toFixed(2)})">${fmtMoney(r.ev)}</td>`;
      });
      html += `</tr>`;
    });
    $("dcfSens").innerHTML = html + "</tbody>";
  }

  function render() {
    INPUTS.forEach((i) => ($(`out-${i.id}`).textContent = fmt(state[i.id], i.fmt)));
    const res = runDCF(state);
    renderKpis(res);
    renderChart(res);
    if (res.valid) renderSensitivity(res);
    else $("dcfSens").innerHTML = `<tbody><tr><td class="muted">Raise WACC above terminal growth to see the grid.</td></tr></tbody>`;
  }

  /* ---------- wire up ---------- */
  buildSliders();
  $("dcfCurrency").addEventListener("change", (e) => { currency = e.target.value; render(); });
  $("dcfReset").addEventListener("click", () => {
    INPUTS.forEach((i) => { state[i.id] = i.value; $(`in-${i.id}`).value = i.value; });
    render();
  });
  window.addEventListener("resize", () => renderChart(runDCF(state)));
  render();

  // Expose the model for experimenting in the browser console: DCF.run({...})
  window.DCF = { run: runDCF, inputs: INPUTS };
})();
