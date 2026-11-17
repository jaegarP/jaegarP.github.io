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
    rotatingWords: ["financial models", "equity valuations", "multi-cloud APIs", "AI-powered workflows", "investor-grade analysis"],
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
      { label: "GitHub", url: "https://github.com/jaegarP", icon: "github" },
      { label: "Xolve (my company)", url: "https://xolve-at8.pages.dev/", icon: "xolve" },
      { label: "Email", url: "mailto:joseph.markinyah@gmail.com", icon: "mail" },
    ],
  },

  /* ---------- Headline numbers (hero strip) ---------- */
  stats: [
    { value: 40, suffix: "%", label: "Faster executive reporting after rebuilding Excel systems" },
    { value: 50000, suffix: "+", label: "Records in datasets analysed & reconciled" },
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
      { icon: "cloud", title: "Cloud & serverless", text: "AWS & Azure serverless APIs, Docker, plus advanced Google Workspace & Microsoft 365." },
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
      title: "Equity Research DCF Models: NVIDIA & ExxonMobil",
      org: "Personal research · full Excel builds",
      year: "2026",
      summary:
        "Two 27-sheet, three-statement DCF models from 10-K data: one high-growth AI chip maker, one mature oil major. Each has best / base / worst scenarios and a full WACC build.",
      details: [
        "Revenue built by segment (NVIDIA: Data Center, Gaming, ProViz, Automotive, OEM; ExxonMobil: Upstream, Energy, Chemical, Specialty Products).",
        "Separate schedules for cost of sales, opex, PP&E, working capital (DSO / DIO / DPO) and financing, which feed a forecast P&L, balance sheet and cash flow.",
        "CAPM cost of equity with an adjusted beta, plus a WACC that moves with the capital structure each year. Terminal value uses Gordon growth.",
        "Base case: NVIDIA $161 a share vs $174 market (−7%); ExxonMobil $146 vs $164 (−11%).",
        "A single switch on the Drivers sheet re-runs the whole model for the best, base or worst case. Every input is sourced and dated.",
      ],
      tags: ["DCF", "3-Statement Model", "WACC", "Scenario Analysis", "Excel"],
      metric: { value: "2", label: "companies valued" },
      links: [
        { label: "See the models", url: "#models" },
        { label: "Download NVIDIA (.xlsx)", url: "assets/models/NVIDIA_DCF_model.xlsx" },
        { label: "Download ExxonMobil (.xlsx)", url: "assets/models/ExxonMobil_DCF_model.xlsx" },
      ],
    },
    {
      published: true,
      featured: true,
      category: "cloud",
      title: "Ballot: Voting App on AWS (TechCrush Capstone)",
      org: "TechCrush Cloud Computing Bootcamp · Group 13",
      year: "2026",
      summary:
        "Group 13's capstone: a five-service voting app shipped to AWS EC2 by a CI/CD pipeline with security scans built in, OIDC credentials, SSM deploys and health-gated releases.",
      details: [
        "Stack: React + Nginx frontend, Flask API (JWT, admin roles), Node.js worker, PostgreSQL and Redis, all run with Docker Compose.",
        "GitHub Actions pipeline: CodeQL, tests and Trivy scans must pass before any image is published or deployed.",
        "Images are tagged with the commit SHA. AWS access uses short-lived OIDC credentials, and deploys go through SSM Run Command with no SSH.",
        "A deploy only counts as successful once all five services report healthy. CloudWatch collects the logs and raises alarms.",
        "One person, one vote, enforced twice: a Redis reservation plus a PostgreSQL uniqueness constraint.",
      ],
      tags: ["AWS EC2", "GitHub Actions", "Docker Compose", "OIDC", "SSM", "CloudWatch", "Trivy"],
      metric: { value: "5th", label: "in the cohort" },
      links: [
        { label: "Read the case study", url: "#capstone" },
        { label: "View repo on GitHub", url: "https://github.com/Christos-Ops/Voting-app" },
      ],
    },
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
        "Bank-statement analysis, multi-account reconciliations and scenario analysis on datasets of 50,000+ records.",
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
    {
      published: true,
      featured: true,
      category: "cloud",
      title: "Multi-Cloud Serverless Contact API",
      org: "Personal project — powers this site's contact form",
      year: "2026",
      summary:
        "A C# (.NET 10) API written once and live on both Azure and AWS. The site sends to Azure first and fails over to AWS automatically if Azure is unavailable.",
      details: [
        "Primary on Azure (South Africa North): Azure Functions on the serverless Flex Consumption plan, Table Storage and Communication Services email, monitored with Application Insights — deployed by a re-runnable Azure CLI script.",
        "Failover on AWS (Ireland): Lambda (.NET 10, arm64) behind a Function URL, DynamoDB storage and Amazon SES email — deployed as infrastructure-as-code with AWS SAM / CloudFormation.",
        "Cloud-neutral core library: server-side validation, honeypot spam trap, per-visitor rate limiting with salted, hashed IPs, and store-before-email so no message is lost.",
        "Website failover: tries each cloud in order, then falls back to the visitor's email app — tested by simulating outages.",
        "Fully containerised with Docker (API + Azurite / DynamoDB Local emulators) and covered by 35 xUnit tests.",
      ],
      tags: ["AWS Lambda", "DynamoDB", "SES", "Azure Functions", "C# / .NET 10", "Docker", "IaC"],
      metric: { value: "2", label: "clouds, 1 codebase" },
      links: [
        { label: "See the architecture", url: "#cloud" },
        { label: "View code on GitHub", url: "https://github.com/jaegarP/portfolio-contact-api" },
      ],
    },
    {
      published: true,
      featured: false,
      category: "cloud",
      title: "This Portfolio Website",
      org: "Personal project · GitHub Pages",
      year: "2026",
      summary:
        "A fast static site with no framework, hosted on GitHub Pages. Its contact form runs on a multi-cloud serverless backend, and all content is edited in one data file.",
      details: [
        "Plain HTML, CSS and JavaScript with no build step, so there's nothing to patch and every push to GitHub redeploys it.",
        "Data-driven: every section is rendered from js/content.js.",
        "Social-preview metadata, light and dark themes, keyboard-accessible cards and a responsive layout down to phone width.",
        "Contact form tries Azure, then AWS, then the visitor's email app, so no enquiry is lost.",
      ],
      tags: ["GitHub Pages", "HTML / CSS / JS", "Accessibility", "Serverless backend"],
      metric: { value: "0", label: "servers to manage" },
      links: [
        { label: "See the architecture", url: "#cloud" },
        { label: "View code on GitHub", url: "https://github.com/jaegarP/jaegarP.github.io" },
      ],
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

  /* ---------- Equity research models (Model lab section) ----------
     Figures are copied from each workbook's base case (DCF and WACC sheets).
     Money is in US$ billions unless the field name says otherwise.
     `actualYears` = how many of the `years` are reported actuals (the rest are forecasts). */
  models: [
    {
      company: "NVIDIA",
      ticker: "NASDAQ: NVDA",
      sector: "Semiconductors · AI compute",
      file: "assets/models/NVIDIA_DCF_model.xlsx",
      valuationDate: "25 Jan 2026",
      priceDate: "11 Nov 2026",
      valuePerShare: 161.21,
      price: 173.73,
      upsidePct: -7.2,
      waccPct: 13.55,
      take:
        "The base case has Data Center revenue nearly doubling in FY2027 (total revenue +90%). Growth then fades to 2% by FY2036, taking revenue to about 6.5× FY2026. A high beta pushes WACC to 13.6%. Even at that growth, the shares come out about 7% above intrinsic value.",
      years: ["FY23", "FY24", "FY25", "FY26", "FY27", "FY28", "FY29", "FY30", "FY31", "FY32", "FY33", "FY34", "FY35", "FY36"],
      actualYears: 4,
      revenueBn: [27.0, 60.9, 130.5, 215.9, 410.5, 689.6, 903.0, 1035.9, 1138.0, 1216.8, 1277.2, 1327.8, 1367.6, 1395.0],
      bridge: [
        { label: "PV of free cash flow (10 yrs)", value: 2399.3 },
        { label: "PV of terminal value", value: 1442.4 },
        { label: "Enterprise value", value: 3841.7, total: true },
        { label: "+ Cash & marketable securities", value: 62.6 },
        { label: "− Debt", value: -8.5 },
        { label: "+ Non-marketable equity securities", value: 22.3 },
        { label: "Equity value", value: 3918.0, total: true },
      ],
      shares: "24,304m shares",
      assumptions: [
        "Risk-free rate 4.98% (10-yr Treasury, 10 Nov 2026)",
        "Equity risk premium 5.0%; adjusted beta 1.81 (raw 2.21)",
        "Cost of equity 14.0%; cost of debt 5.4%; tax 17%",
        "Terminal growth 2.0%; terminal value = 38% of EV",
      ],
    },
    {
      company: "ExxonMobil",
      ticker: "NYSE: XOM",
      sector: "Integrated oil & gas",
      file: "assets/models/ExxonMobil_DCF_model.xlsx",
      valuationDate: "31 Dec 2025",
      priceDate: "10 Nov 2026",
      valuePerShare: 146.1,
      price: 164.43,
      upsidePct: -11.2,
      waccPct: 6.72,
      take:
        "Revenue rebounds 17% in 2026, then grows about 2% a year to 2035. A very low beta (adjusted to 0.44) gives a 6.7% WACC, so 60% of the value sits in the terminal value. On these assumptions the stock is about 11% above intrinsic value.",
      years: ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"],
      actualYears: 4,
      revenueBn: [413.7, 344.6, 349.6, 332.2, 388.5, 355.8, 346.8, 354.3, 362.0, 369.2, 376.5, 384.0, 391.6, 399.4],
      bridge: [
        { label: "PV of free cash flow (10 yrs)", value: 256.7 },
        { label: "PV of terminal value", value: 392.1 },
        { label: "Enterprise value", value: 648.8, total: true },
        { label: "+ Cash", value: 10.7 },
        { label: "− Debt", value: -43.5 },
        { label: "− Noncontrolling interests", value: -7.2 },
        { label: "Equity value", value: 608.7, total: true },
      ],
      shares: "4,166.8m shares",
      assumptions: [
        "Risk-free rate 4.98% (10-yr Treasury, 10 Nov 2026)",
        "Equity risk premium 5.0%; adjusted beta 0.44 (raw 0.16)",
        "Cost of equity 7.2%; cost of debt 5.5%; tax 28%",
        "Terminal growth 2.0%; terminal value = 60% of EV",
      ],
    },
  ],
  modelsNote:
    "Educational models built from public 10-K filings. They are not investment advice. Each workbook has 27 sheets: drivers & scenarios, P&L and balance-sheet inputs, revenue, gross-profit and opex builds, PP&E, working capital, financing, WACC, a three-statement forecast and the DCF. Change Drivers!C3 to switch between best, base and worst cases.",

  /* ---------- Cloud & DevOps section ---------- */
  cloud: {
    // Cards at the top of the section. status: "live" shows a green dot.
    deployments: [
      {
        title: "Portfolio website",
        status: "live",
        statusText: "Live",
        where: "GitHub Pages",
        text: "Static site with a global CDN and HTTPS. Every push to GitHub redeploys it.",
        stack: ["GitHub Pages", "HTML / CSS / JS"],
        links: [
          { label: "Repo", url: "https://github.com/jaegarP/jaegarP.github.io" },
        ],
      },
      {
        title: "Multi-cloud contact API",
        status: "live",
        statusText: "Live on 2 clouds",
        where: "Azure (South Africa North) + AWS (Ireland)",
        text: "One C# codebase deployed to Azure Functions and AWS Lambda, with automatic failover between them. It runs this site's contact form.",
        stack: ["Azure Functions", "AWS Lambda", "DynamoDB", "SES", "SAM / CloudFormation", "Docker"],
        links: [{ label: "Repo", url: "https://github.com/jaegarP/portfolio-contact-api" }],
      },
      {
        title: "Ballot voting app",
        status: "team",
        statusText: "Capstone · Group 13",
        where: "AWS EC2 via GitHub Actions",
        text: "Five containerised services shipped by a scan-gated CI/CD pipeline with OIDC credentials, SSM deploys and health checks.",
        stack: ["AWS EC2", "SSM", "OIDC", "GitHub Actions", "Docker Compose", "CloudWatch"],
        links: [
          { label: "Case study", url: "#capstone" },
          { label: "Repo", url: "https://github.com/Christos-Ops/Voting-app" },
        ],
      },
    ],

    // The TechCrush capstone case study
    capstone: {
      title: "Ballot: a voting app with a production-style delivery pipeline on AWS",
      programme: "TechCrush Cloud Computing Bootcamp · Final capstone",
      team: "Group 13",
      result: "Finished 5th in the cohort",
      // Write your own part here (e.g. "I built the CloudWatch monitoring and the deploy script").
      // Leave it as "" to hide the line.
      myRole:
        "I provisioned the AWS EC2 host, security groups and IAM roles; containerised the five services with Docker and Docker Compose; built the GitHub Actions pipeline that tests, scans and deploys every change; and wrote the automated tests that gate each release.",
      credit: "Team project. The repository is hosted by teammate Taiwo Christopher Aderemi.",
      repo: "https://github.com/Christos-Ops/Voting-app",
      summary:
        "Ballot is a full-stack election app with voter and admin workflows. The real focus is how it ships: every change is scanned, built, tagged and deployed to AWS automatically, and a release only counts once all five services report healthy.",
      pipeline: [
        { title: "Push or PR", text: "to main / staging" },
        { title: "Code checks", text: "CodeQL, unit tests, Trivy source & dependency scan" },
        { title: "Build", text: "API, worker & frontend images" },
        { title: "Image scan", text: "Trivy blocks high / critical issues" },
        { title: "Publish", text: "images tagged with the commit SHA" },
        { title: "OIDC", text: "short-lived AWS credentials, no stored keys" },
        { title: "SSM deploy", text: "Run Command on EC2, no SSH" },
        { title: "Health gate", text: "all 5 services must report healthy" },
      ],
      highlights: [
        { title: "Security built in", text: "Nothing ships until it passes the scans. Secrets live only on the server, never in the pipeline or its logs." },
        { title: "Full traceability", text: "Each deployment runs images tagged with the exact commit they were built from, so it's always clear what's running." },
        { title: "Two-layer vote integrity", text: "Redis reserves one vote per voter and election. PostgreSQL enforces the same rule as a backstop." },
        { title: "Resilient worker", text: "Votes are written in a transaction, and any job left half-done is recovered after a restart." },
      ],
      nextSteps: [
        "HTTPS via a load balancer with TLS",
        "Automatic rollback when a health check fails",
        "Terraform for the IAM roles and infrastructure",
        "Automated database backups and restore",
        "AWS Secrets Manager for application secrets",
      ],
    },

    // "What I can do → where you can see it" table
    capabilities: [
      { skill: "Serverless", evidence: "Azure Functions (Flex Consumption) and AWS Lambda (arm64, Function URL) serving one shared C# core." },
      { skill: "Infrastructure as code", evidence: "AWS SAM / CloudFormation template for Lambda, DynamoDB, IAM and logs. Re-runnable Azure CLI deployment script." },
      { skill: "CI/CD", evidence: "Capstone pipeline in GitHub Actions: CodeQL, tests, Trivy scans, build, publish and deploy. The website redeploys on every push." },
      { skill: "Containers", evidence: "Docker Compose stack for the contact API with Azurite and DynamoDB Local emulators, plus the capstone's five-service production Compose stack." },
      { skill: "Security", evidence: "OIDC instead of stored keys and SSM instead of SSH (capstone). CORS locked to this site, salted IP hashing, rate limiting and a spam honeypot (contact API)." },
      { skill: "Resilience", evidence: "Multi-cloud failover: Azure → AWS → email app, tested by simulating outages. Messages are stored before any email is sent." },
      { skill: "Observability", evidence: "Application Insights on Azure, CloudWatch logs (30-day retention) on AWS, and CloudWatch alarms on the capstone." },
      { skill: "Cost governance", evidence: "$2/month budget alerts on AWS and both Azure subscriptions. Scale-to-zero serverless plans keep idle cost at about $0." },
      { skill: "Testing", evidence: "35 xUnit tests on the contact API. The capstone's API and worker tests run in CI on every change." },
    ],
  },

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
        "Built Excel reporting systems that cut executive reporting delays by 40%; reconciliations and scenario analysis on 50,000+ record datasets.",
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
    "AWS (Lambda, DynamoDB, SES)",
    "Azure Functions",
    "Docker",
    "C# / .NET",
    "GitHub Actions CI/CD",
    "Infrastructure as Code (SAM)",
    "AWS EC2 & SSM",
    "Cost governance (Budgets)",
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
      title: "Cloud Computing Bootcamp",
      org: "TechCrush",
      period: "2026",
      note: "AWS, Docker, CI/CD and DevOps practice. Capstone with Group 13: the Ballot voting app on AWS. Finished 5th in the cohort.",
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
    // Contact API endpoints (the contact-api project), tried in order — multi-cloud failover:
    //   1st: Azure Functions URL   e.g. "https://jpcontact-api-xxxx.azurewebsites.net/api/contact"
    //   2nd: AWS Lambda URL        e.g. "https://xxxx.lambda-url.eu-west-1.on.aws/api/contact"
    // If every API is unreachable (or the list is empty), the form opens the visitor's email app.
    apiUrls: [
      "https://jpcontact-api-1621e5.azurewebsites.net/api/contact", // 1st: Azure Functions (South Africa North)
      "https://roajuqqamphmcvoxnkiljnds6e0dmlll.lambda-url.eu-west-1.on.aws/api/contact", // 2nd: AWS Lambda (Ireland) — backup
    ],
  },

  /* ---------- Footer ---------- */
  footer: {
    note: "Designed & built with HTML, CSS and JavaScript. Edit everything in js/content.js.",
  },
};
