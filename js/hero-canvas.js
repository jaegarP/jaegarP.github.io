/* =====================================================================
   HERO BACKGROUND — animated "data network" + flowing price line.
   Tweak the CONFIG values to change density, speed and look.
   Colours come from the CSS variables --accent and --accent-2.
   ===================================================================== */

(() => {
  const CONFIG = {
    nodeDensity: 0.00009,   // nodes per pixel² (higher = more dots)
    maxNodes: 120,
    linkDistance: 140,      // px — how close nodes must be to connect
    speed: 0.25,            // node drift speed
    mouseRadius: 180,       // px — nodes near the cursor get highlighted
    lineSpeed: 0.6,         // speed of the flowing price line
  };

  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr, nodes = [], colors = {}, t = 0, running = true;
  const mouse = { x: -9999, y: -9999 };

  function readColors() {
    const s = getComputedStyle(document.documentElement);
    colors.a = s.getPropertyValue("--accent").trim() || "#2dd4bf";
    colors.b = s.getPropertyValue("--accent-2").trim() || "#f5b544";
  }

  function hexToRgba(hex, a) {
    const m = hex.replace("#", "");
    const n = parseInt(m.length === 3 ? m.replace(/./g, "$&$&") : m, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(CONFIG.maxNodes, Math.floor(w * h * CONFIG.nodeDensity));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  // Smooth pseudo-random "market" curve built from layered sine waves
  function priceY(x) {
    const base = h * 0.72;
    return (
      base -
      x * 0.08 +
      Math.sin((x + t * 40) * 0.006) * 38 +
      Math.sin((x + t * 70) * 0.017) * 14 +
      Math.sin((x + t * 20) * 0.031) * 6
    );
  }

  function drawPriceLine() {
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, hexToRgba(colors.a, 0));
    grad.addColorStop(0.4, hexToRgba(colors.a, 0.5));
    grad.addColorStop(1, hexToRgba(colors.b, 0.6));

    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y = priceY(x);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();

    // soft area fill under the line
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, h * 0.5, 0, h);
    fill.addColorStop(0, hexToRgba(colors.a, 0.08));
    fill.addColorStop(1, hexToRgba(colors.a, 0));
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function frame() {
    if (!running) return;
    t += 0.016 * CONFIG.lineSpeed;
    ctx.clearRect(0, 0, w, h);

    drawPriceLine();

    // move + draw nodes
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    const maxD = CONFIG.linkDistance;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < maxD) {
          ctx.strokeStyle = hexToRgba(colors.a, (1 - d / maxD) * 0.18);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      const near = md < CONFIG.mouseRadius;
      ctx.fillStyle = near ? colors.b : hexToRgba(colors.a, 0.55);
      ctx.beginPath();
      ctx.arc(a.x, a.y, near ? a.r + 1.2 : a.r, 0, Math.PI * 2);
      ctx.fill();
      if (near) {
        ctx.strokeStyle = hexToRgba(colors.b, (1 - md / CONFIG.mouseRadius) * 0.35);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  // Pause animation when hero is off-screen (saves battery)
  new IntersectionObserver(([e]) => {
    const wasRunning = running;
    running = e.isIntersecting;
    if (running && !wasRunning && !reduceMotion) requestAnimationFrame(frame);
  }).observe(canvas);

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });

  window.addEventListener("resize", resize);
  document.addEventListener("themechange", () => { readColors(); if (reduceMotion) frame(); });

  readColors();
  resize();
  frame();
})();
