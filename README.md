# Joseph P. Mark-Inyah — Portfolio Website

A fast, dependency-free portfolio site (plain HTML, CSS, JavaScript) showcasing financial modeling, AI and cloud work — including a live, interactive DCF valuation model.

No build tools, no frameworks, nothing to install. Open the folder in VS Code and edit.

---

## 1. Open & preview in VS Code

1. **File → Open Folder…** and pick this folder.
2. Accept the prompt to install the **recommended extensions** (Live Server, Prettier, etc.).
3. Click **Go Live** in the bottom-right status bar. The site opens at `http://127.0.0.1:5500` and **reloads automatically every time you save**.
4. Optional: press **F5** to open it with the browser debugger attached (set breakpoints in `js/*.js`).

> You can also just double-click `index.html` to open it in a browser — everything works offline except the Google Fonts.

---

## 2. Where everything lives

```
port/
├── index.html          ← page structure: sections, nav, forms (rarely needs edits)
├── css/
│   └── style.css       ← ALL styling. Colours & fonts are at the very top (design tokens)
├── js/
│   ├── content.js      ← ★ ALL TEXT & DATA: bio, projects, experience, skills, education
│   ├── main.js         ← renders content.js into the page + interactions (filters, modal, theme…)
│   ├── dcf.js          ← the interactive DCF model (inputs, maths, chart, sensitivity table)
│   ├── hero-canvas.js  ← animated background in the hero section
│   └── icons.js        ← SVG icon set
├── assets/
│   ├── Joseph_Mark-Inyah_CV.pdf   ← the "Download CV" file
│   └── favicon.svg                ← browser-tab icon
└── .vscode/            ← VS Code settings, recommended extensions, F5 launch config
```

---

## 3. Common edits (cheat sheet)

| I want to…                         | Edit this                                                                 |
|-----------------------------------|---------------------------------------------------------------------------|
| Change my name, tagline, location | `js/content.js` → `person`                                                |
| Change the typing words in the hero | `js/content.js` → `person.rotatingWords`                                |
| Change the 4 headline numbers     | `js/content.js` → `stats`                                                 |
| **Add a project**                 | `js/content.js` → `projects` — copy the TEMPLATE block at the bottom, set `published: true` |
| Hide a project without deleting   | set `published: false`                                                    |
| Pin a project to the top          | set `featured: true`                                                      |
| Add a project category            | add to `projectCategories` and add a `--cat-yourid` colour in `css/style.css` + a `.project[data-cat="yourid"]` rule |
| Add a job                         | `js/content.js` → `experience`                                            |
| Change skills / bar lengths       | `js/content.js` → `skillGroups` (`level` is 0–100)                        |
| Show my phone number              | `js/content.js` → `person.showPhone: true`                                |
| Add GitHub / other socials        | `js/content.js` → `person.socials` (icons: linkedin, github, mail)        |
| Replace the CV                    | drop the new PDF in `assets/` and update `person.resumeUrl`               |
| Change colours                    | `css/style.css` → top of file: `--accent`, `--accent-2`, `--bg`…          |
| Change fonts                      | the Google Fonts `<link>` in `index.html` + `--font-*` in `css/style.css` |
| Change DCF defaults / sliders     | `js/dcf.js` → `INPUTS` array                                              |
| Change the hero animation         | `js/hero-canvas.js` → `CONFIG`                                            |
| Add a new icon                    | `js/icons.js` — paste the paths of any 24×24 stroke icon (e.g. lucide.dev) |

### Adding a project — example

```js
{
  published: true,
  featured: true,
  category: "cloud",            // finance | ai | cloud | research
  title: "Power BI Dashboard on Azure",
  org: "Personal project",
  year: "2026",
  summary: "Automated monthly management reporting from Excel into an Azure-hosted Power BI dashboard.",
  details: ["Built a data model in Power Query", "Published to Power BI Service", "Cut reporting time from 2 days to 2 hours"],
  tags: ["Azure", "Power BI", "DAX"],
  metric: { value: "−90%", label: "reporting time" },
  links: [{ label: "View on GitHub", url: "https://github.com/you/repo" }],
},
```

---

## 4. Contact form

By default the form opens the visitor's email app with the message pre-filled (works with zero setup).
To receive messages directly instead, create a free form at [formspree.io](https://formspree.io), then in `index.html`
change `<form class="card contact__form reveal" id="contactForm">` to
`<form class="card contact__form reveal" action="https://formspree.io/f/YOUR_ID" method="POST">`
(remove the `id`, so `main.js` no longer intercepts it).

---

## 5. Social preview image (LinkedIn / WhatsApp card)

When your link is shared, sites show `assets/og-image.png` (1200 × 627) plus the `og:` tags near the top of `index.html`.

To change the image:
1. Edit the text/colours in `tools/og-card.html` (open it in a browser to preview).
2. Re-render it to PNG — paste this in the VS Code terminal (PowerShell):
   ```powershell
   & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,627 --virtual-time-budget=8000 "--screenshot=$PWD\assets\og-image.png" "$PWD\tools\og-card.html"
   ```
3. Commit & sync, then refresh LinkedIn's cached copy at **linkedin.com/post-inspector** (paste your URL → Inspect).

If you move to a custom domain, update every `https://jaegarp.github.io` URL in the `<head>` of `index.html`.

---

## 6. Put it online (free)

Any static host works — there is no server code:

- **GitHub Pages:** push this folder to a GitHub repo → Settings → Pages → deploy from `main` branch.
- **Netlify / Vercel:** drag-and-drop this folder at app.netlify.com/drop.
- **Azure Static Web Apps** or **AWS S3 + CloudFront** — a nice extra line for the *Cloud* section of the portfolio itself.

> ⚠️ Your CV PDF is in `assets/` and will be publicly downloadable once the site is online. Set `person.resumeUrl: ""` to hide the button.
