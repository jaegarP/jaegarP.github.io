/* =====================================================================
   SITE CONTENT — edit this file to change almost everything on the site
   ---------------------------------------------------------------------
   • Every section (hero, about, projects, experience, skills, education,
     contact) is rendered from the SITE object below by js/main.js.
   • To add a project: copy one of the objects in `projects`, paste it
     below the last one, and change the fields. Save → refresh browser.
   • `published: false` hides an item without deleting it (handy for drafts).
   • Project categories must match one of the ids in `projectCategories`.
   • Text fields accept plain text. Fields named `html` accept simple HTML.
   ===================================================================== */

window.SITE = {
  /* ---------- Basic identity ---------- */
  meta: {
    title: "Joseph P. Mark-Inyah — Finance, AI & Cloud Portfolio",
    description:
      "Portfolio of Joseph P. Mark-Inyah: financial modeling, operations analytics, AI-enabled workflows and cloud tools.",
  },

  person: {
    name: "Joseph P. Mark-Inyah",
    shortName: "JP",
    role: "Financial & Operations Analyst",
    // Rotating words shown in the hero after "I build…"
    rotatingWords: ["financial models", "AI-powered workflows", "cloud-ready reporting", "investor-grade analysis"],
    tagline:
      "Mathematics graduate turned finance & operations analyst. I turn messy data into decision-ready models, reports and systems — for boardrooms, auditors and investors.",
    location: "Lagos, Nigeria",
    availability: "Open to finance, strategy & business-development roles",
    email: "joseph.markinyah@gmail.com",
    phone: "+234 815 910 9506",
    showPhone: false, // set to true to display your phone number publicly
    resumeUrl: "assets/Joseph_Mark-Inyah_CV.pdf", // set to "" to hide the CV button
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jpmark-inyah/", icon: "linkedin" },
      { label: "Email", url: "mailto:joseph.markinyah@gmail.com", icon: "mail" },
      // { label: "GitHub", url: "https://github.com/your-username", icon: "github" },
    ],
  },

  /* ---------- Headline numbers (hero strip) ---------- */
  stats: [
    { value: 40, suffix: "%", label: "Faster executive reporting after rebuilding Excel systems" },
    { value: 5000, suffix: "+", label: "Records in datasets analysed & reconciled" },
    { value: 50, suffix: "+", label: "Research clients served with SPSS & Excel" },
    { value: 90, suffix: "%", label: "Client retention in research consultancy" },
  ],

  /* ---------- About ---------- */
  about: {
    heading: "Quantitative rigour. Executive discretion. Operational follow-through.",
    paragraphs: [
      "I'm a finance and operations professional with a B.Sc. (Ed) in Mathematics from the University of Lagos (Second Class Upper). My work sits where quantitative skill, operational excellence and strategic thinking meet.",
      "As Executive & Operations Analyst to the Chairman of a multi-entity real estate investment consortium, I supported a high-ticket capital expansion round — contributing to project-finance modelling, investment analysis, management accounts and board-level reporting — while coordinating consultants, banks, contractors and government agencies.",
      "Today I'm an Associate in Audit & Assurance at PKF Nigeria, an ICAN student, and someone who uses AI tools daily to research faster and build better systems.",
    ],
    highlights: [
      { icon: "chart", title: "Financial modeling", text: "Project finance, DCF, multiples & LBO, scenario analysis." },
      { icon: "ai", title: "AI-enabled work", text: "AI-assisted research synthesis & AI training-data contribution." },
      { icon: "cloud", title: "Cloud tools", text: "Google Workspace & Microsoft 365 (advanced) for multi-entity ops." },
      { icon: "shield", title: "Audit & governance", text: "IFRS-aligned working papers, controls & confidentiality." },
    ],
  },

  /* ---------- Projects / Works ---------- */
  projectCategories: [
    { id: "all", label: "All work" },
    { id: "finance", label: "Financial Modeling" },
    { id: "ai", label: "AI & Data" },
    { id: "cloud", label: "Cloud & Systems" },
    { id: "research", label: "Research" },
  ],

  projects: [
    {
      published: true,
      featured: true,
      category: "finance",
      title: "Project-Finance Model for a Real Estate Capital Raise",
      org: "Fish Valley Investments & Property Ltd",
      year: "2024 – 2026",
      summary:
        "Supported senior leadership through a high-ticket capital expansion round with project-finance modelling, investment analysis and board-level financial reporting.",
      details: [
        "Contributed to the project-finance model, investment analysis and scenario runs used in investor and board discussions.",
        "Prepared management accounts and board-level financial reports; supported IFRS-compliant audited financial statements with top-tier audit firms.",
        "Drafted investment memoranda, cash-flow analyses and briefing documents for the Chairman.",
        "Figures are confidential — details available in conversation on request.",
      ],
      tags: ["Project Finance", "Scenario Analysis", "IFRS", "Excel"],
      metric: { value: "Board-level", label: "reporting" },
      links: [],
    },
    {
      published: true,
      featured: true,
      category: "finance",
      title: "Interactive DCF & Sensitivity Lab",
      org: "Built for this portfolio",
      year: "2026",
      summary:
        "A live discounted-cash-flow model you can play with right on this page — change growth, margins and WACC and watch enterprise value and the sensitivity grid recompute.",
      details: [
        "Five-year free-cash-flow projection with Gordon-growth terminal value.",
        "WACC × terminal-growth sensitivity table with heat-map shading.",
        "Written in plain JavaScript (js/dcf.js) so the logic is auditable line by line.",
      ],
      tags: ["DCF", "Valuation", "JavaScript", "Data Viz"],
      metric: { value: "Live", label: "model" },
      links: [{ label: "Open the lab", url: "#lab" }],
    },
    {
      published: true,
      featured: false,
      category: "finance",
      title: "Valuation Model Suite — DCF, Multiples & LBO",
      org: "The Complete Investment Banking Course",
      year: "2025",
      summary:
        "Built full valuation models covering discounted cash flow, trading & transaction multiples, leveraged buyouts and M&A fundamentals.",
      details: [
        "DCF with WACC build-up and terminal value cross-checks.",
        "Comparable-company and precedent-transaction multiples valuation.",
        "LBO model: sources & uses, debt schedule, returns (IRR / MoM) analysis.",
      ],
      tags: ["DCF", "LBO", "M&A", "Excel"],
      metric: { value: "3", label: "valuation methods" },
      links: [],
    },
    {
      published: true,
      featured: true,
      category: "cloud",
      title: "Executive Reporting & Operations Database",
      org: "Fish Valley Investments & Property Ltd",
      year: "2024 – 2026",
      summary:
        "Designed Excel-based operational databases and reporting systems that cut executive reporting delays by 40% across a multi-entity group.",
      details: [
        "Structured operational data across Finance, Operations, HR, Legal, IT and Security into one reporting backbone.",
        "Bank-statement analysis, multi-account reconciliations and scenario analysis on datasets of 5,000+ records.",
        "Shared via cloud workspaces (Google Workspace / Microsoft 365) for real-time access by leadership.",
      ],
      tags: ["Excel", "Reconciliation", "Google Workspace", "Process Design"],
      metric: { value: "−40%", label: "reporting delay" },
      links: [],
    },
    {
      published: true,
      featured: false,
      category: "cloud",
      title: "Multi-Entity Bookkeeping & Controls",
      org: "Fish Valley Investments & Property Ltd",
      year: "2024 – 2026",
      summary:
        "Maintained full-cycle accounting records across several companies with strict approval and documentation controls.",
      details: [
        "Double-entry bookkeeping, journal adjustments, trial balances and period-end accruals.",
        "Petty-cash administration and payment-voucher processing under internal approval controls.",
        "Audit-ready documentation supporting external auditors.",
      ],
      tags: ["Bookkeeping", "Internal Controls", "Audit Support"],
      metric: { value: "Multi", label: "entity" },
      links: [],
    },
    {
      published: true,
      featured: true,
      category: "ai",
      title: "AI-Accelerated Executive Research Workflow",
      org: "Office of the Chairman",
      year: "2024 – 2026",
      summary:
        "Used ChatGPT and Claude to speed up research synthesis for briefing documents, investment memoranda and stakeholder correspondence — without compromising confidentiality.",
      details: [
        "Prompted LLMs to summarise market research, draft structured briefs and stress-test arguments.",
        "Human-in-the-loop review: every output checked and rewritten before reaching the Chairman.",
        "Clear rules on what data never leaves the organisation (undisclosed figures, board decisions).",
      ],
      tags: ["ChatGPT", "Claude", "Prompting", "Research Synthesis"],
      metric: { value: "LLM", label: "assisted" },
      links: [],
    },
    {
      published: true,
      featured: false,
      category: "ai",
      title: "AI Training-Data Contribution",
      org: "micro1 (Remote)",
      year: "2026",
      summary:
        "Captured and quality-checked facial image data for AI model training datasets to detailed client specifications.",
      details: [
        "Followed strict specs on lighting, angles and image quality.",
        "Checked every submission against quality guidelines and data-privacy requirements before delivery.",
      ],
      tags: ["AI Datasets", "Data Quality", "Privacy"],
      metric: { value: "QA", label: "first" },
      links: [],
    },
    {
      published: true,
      featured: false,
      category: "research",
      title: "Modelling Smartphone Addiction",
      org: "University of Lagos — Final coursework",
      year: "2023",
      summary:
        "Final-year mathematical modelling project combining statistics & probability, operations research and numerical analysis.",
      details: [
        "Built and analysed a mathematical model of smartphone addiction dynamics.",
        "Applied statistical modelling, probability and numerical methods to test behaviour of the model.",
      ],
      tags: ["Mathematical Modelling", "Statistics", "Numerical Analysis"],
      metric: { value: "2:1", label: "B.Sc. Mathematics" },
      links: [],
    },
    {
      published: true,
      featured: false,
      category: "research",
      title: "Quantitative Research Consultancy",
      org: "Freelance",
      year: "2022 – Present",
      summary:
        "End-to-end quantitative and qualitative research for 50+ academic and institutional clients using SPSS and Excel.",
      details: [
        "Research design, data-collection methodology, analysis and final reporting.",
        "Average 14-day turnaround with 90% client retention.",
        "Structured reports and data visualisations that turn complex datasets into clear insights.",
      ],
      tags: ["SPSS", "Excel", "Data Visualisation", "Statistics"],
      metric: { value: "50+", label: "clients" },
      links: [],
    },

    /* ---- TEMPLATE: copy this block for a new project, then set published: true ---- */
    {
      published: false,
      featured: false,
      category: "cloud", // finance | ai | cloud | research
      title: "Your next cloud project",
      org: "Personal project",
      year: "2026",
      summary: "One or two sentences on what you built and why it matters.",
      details: ["What you did", "Tools you used", "The result (ideally a number)"],
      tags: ["Azure", "AWS", "Power BI"],
      metric: { value: "—", label: "result" },
      links: [{ label: "View on GitHub", url: "https://github.com/" }],
    },
  ],

  /* ---------- Experience timeline ---------- */
  experience: [
    {
      role: "Associate, Audit & Assurance",
      org: "PKF Nigeria",
      period: "Aug 2026 – Present",
      points: [
        "Support statutory and external audit engagements across a portfolio of client organisations.",
        "Fieldwork: verifying financial statement line items, testing transactions and supporting schedules.",
        "Prepare audit working papers in line with firm methodology and IFRS / international standards.",
      ],
    },
    {
      role: "AI Facial Data Collection Contributor",
      org: "micro1 (Remote)",
      period: "Aug 2026",
      points: [
        "Captured facial image data for AI model training to detailed client specifications.",
        "Quality-checked every submission against guidelines and data-privacy requirements.",
      ],
    },
    {
      role: "Executive, Administrative & Operations Analyst (EA to the Chairman)",
      org: "Fish Valley Investments & Property Limited",
      period: "Jan 2024 – Jul 2026",
      points: [
        "Strategic interface for the Chairman across Finance, Operations, HR, Legal, IT and Security; liaised with consultants (Arup, KOA, APD), banks, contractors and government agencies.",
        "Supported a high-ticket capital expansion round with project-finance modelling, investment analysis, management accounts and board reports.",
        "Built Excel reporting systems that cut executive reporting delays by 40%; reconciliations and scenario analysis on 5,000+ record datasets.",
        "Managed 15+ high-priority monthly commitments including investor, board and government engagements.",
      ],
    },
    {
      role: "Research & Academic Consultant",
      org: "Freelance",
      period: "Aug 2022 – Present",
      points: [
        "Quantitative & qualitative research for 50+ clients using SPSS and Excel, 90% retention.",
        "Research design through to final report writing, on tight deadlines.",
      ],
    },
    {
      role: "Academic Mentor (Volunteer)",
      org: "Secondary school students",
      period: "Nov 2021 – Dec 2025",
      points: [
        "Mentored students in Mathematics, Physics and Chemistry.",
        "Delivered 45% and 60% improvements in assessment scores for two privately tutored students.",
      ],
    },
  ],

  /* ---------- Skills (level is 0–100, drives the bar length) ---------- */
  skillGroups: [
    {
      title: "Finance & Accounting",
      icon: "chart",
      skills: [
        { name: "Financial Modeling (Excel)", level: 90 },
        { name: "Financial Analysis & Reporting", level: 90 },
        { name: "Accounting & Audit Processes", level: 85 },
        { name: "Valuation — DCF, Multiples, LBO", level: 80 },
      ],
    },
    {
      title: "Data & AI",
      icon: "ai",
      skills: [
        { name: "Data Analysis (SPSS, Excel)", level: 90 },
        { name: "Quantitative & Qualitative Research", level: 90 },
        { name: "AI Tools (ChatGPT, Claude)", level: 85 },
        { name: "Programming", level: 55 },
      ],
    },
    {
      title: "Cloud & Operations",
      icon: "cloud",
      skills: [
        { name: "Google Workspace & Microsoft 365 (Advanced)", level: 95 },
        { name: "Business Process Optimisation", level: 85 },
        { name: "Cross-Functional Operations", level: 90 },
        { name: "Strategic Planning & Reporting", level: 85 },
      ],
    },
  ],
  // Extra skills shown as chips under the bars
  skillChips: [
    "Stakeholder & Executive Liaison",
    "Corporate Governance",
    "IFRS",
    "Bank Reconciliation",
    "Project & Calendar Management",
    "Board Minutes",
    "Investment Memoranda",
    "Data Visualisation",
  ],

  /* ---------- Education & credentials ---------- */
  education: [
    {
      title: "B.Sc. (Ed) Mathematics — Second Class Upper (2:1)",
      org: "University of Lagos (UNILAG), Akoka",
      period: "2018 – 2023",
      note: "Statistical modelling, calculus, linear algebra, probability. NLNG Undergraduate Scholarship awardee (2019).",
    },
    {
      title: "ICAN — Student (Foundations)",
      org: "Institute of Chartered Accountants of Nigeria",
      period: "Expected Nov 2026",
      note: "Professional accountancy qualification in progress.",
    },
    {
      title: "The Complete Investment Banking Course",
      org: "Udemy",
      period: "2025",
      note: "Financial modelling, DCF & multiples valuation, LBO modelling, M&A fundamentals.",
    },
    {
      title: "NCUK International Foundation Year — Engineering",
      org: "Brookstone International School, Port Harcourt",
      period: "2015 – 2016",
      note: "Best Overall Result in the 15/16 cohort (4 A*s). Engineering Mathematics: 98.",
    },
    {
      title: "IGCSE",
      org: "Avi-Cenna International School, Ikeja",
      period: "2012 – 2015",
      note: "4 A*s and 4 As — among the top graduating students of the cohort.",
    },
  ],

  /* ---------- Contact section ---------- */
  contact: {
    heading: "Let's build something decision-ready.",
    text: "Hiring for finance, strategy or business development — or need a model, a report or a research partner? Send a message and I'll get back to you.",
    // Contact API endpoint (the Azure Function in the contact-api project).
    // Leave "" to fall back to opening the visitor's email app.
    apiUrl: "",
  },

  /* ---------- Footer ---------- */
  footer: {
    note: "Designed & built with HTML, CSS and JavaScript. Edit everything in js/content.js.",
  },
};
