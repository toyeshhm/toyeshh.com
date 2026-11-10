// Shared real content for every design board. Sources: Toyo Brain Personal Profile,
// the old site's content/agent files, and project READMEs in ~/dev/projects.
// Boards read window.TOYESHH; never add facts that are not here.
window.TOYESHH = {
  name: "Toyeshh Medikonda",
  short: "Toyeshh",
  handle: "toyeshhm",
  place: "Frisco, Texas → Austin",
  now: "Incoming Turing Scholar, Computer Science and Mathematics, UT Austin (class of 2030)",
  line: "Builds products, models and agents. Ships them, then measures them.",
  links: {
    email: "toyeshhm@gmail.com",
    github: "https://github.com/toyeshhm",
    linkedin: "https://www.linkedin.com/in/toyeshh-medikonda/",
    resume: "#resume" // placeholder until the real PDF exists
  },
  experience: [
    { org: "Ultra (YC W24)", role: "Founding technical engineer, UI/UX lead", when: "Jan–Aug 2025",
      did: "Co-built the frontend and AI features of a college-guidance platform. Worked 1:1 with the CEO.",
      numbers: [["10,000+", "users in four months"], ["20 → 2,500+", "Discord members"]] },
    { org: "Non-Trivial", role: "Quantum ML researcher", when: "Mar–Jul 2025",
      did: "Designed a quantum convolutional neural network for early crop-disease detection.",
      numbers: [["+20%", "accuracy over classical CNNs"]] },
    { org: "UT Dallas", role: "Research intern, NLP", when: "Jun–Sep 2025",
      did: "Created CCS, an NLP metric for evaluating computational art, and fine-tuned GPT-4, Claude 3 and Llama 3 to cut cultural bias.",
      numbers: [["850+", "annotations in the dataset"], ["−38%", "LLM cultural bias"]] },
    { org: "New York Academy of Sciences", role: "Research team lead", when: "Mar 2025–now",
      did: "Led NanoChar, a biochar–nanocellulose air-filtration prototype.",
      numbers: [["−63%", "cell damage vs. control"], ["2nd / 119", "teams"]] }
  ],
  wins: [
    { what: "USACO Platinum", detail: "Top division of the USA Computing Olympiad" },
    { what: "M3 Math Modeling finalist", detail: "6th of 770+ teams. Presented at Jane Street, Best Presenter, $5,500" },
    { what: "BPA Nationals, Financial Portfolio Management", detail: "1st of 200+ teams" },
    { what: "BPA Nationals, Java Programming", detail: "12th of 901" },
    { what: "WearItForward", detail: "Cofounded. $200,000+ raised, 160K+ clothing pieces donated, on Fox News and five other outlets" },
    { what: "ExcelAcademe", detail: "Outreach director. Sponsorships from Jane Street, Wolfram and AoPS" }
  ],
  projects: [
    { name: "Toyo Brain", kind: "agents", one: "A personal AI agent system: memory, scheduled jobs, a knowledge graph over an Obsidian vault, and model routing between Claude and Codex.", stack: ["Claude Code", "MCP", "launchd", "Obsidian"] },
    { name: "The Survivorship Tax", kind: "quant", one: "Rebuilds the same equity signals five times over a point-in-time S&P 500 universe (174 months) and measures what each backtest shortcut is worth in Sharpe.", stack: ["Python 3.12", "pandas", "statsmodels"] },
    { name: "YC Intel", kind: "data", one: "Tracks 5,000+ Y Combinator startups with data pipelines, entity extraction and LLM company profiles.", stack: ["Python", "LLMs", "dashboards"] },
    { name: "Lecture Notes", kind: "ml", one: "Records a lecture and transcribes it on the Mac's Neural Engine. No audio leaves the machine.", stack: ["Swift", "on-device ML"] },
    { name: "StudyAtlas", kind: "ios", one: "A native iOS app for finding somewhere to work: outlets, noise at 3pm, whether they let you stay.", stack: ["SwiftUI", "MapKit"] },
    { name: "Leetposter", kind: "game", one: "A social-deduction party game: friends solve one hard algorithm problem in 40 minutes while one of them sabotages it.", stack: ["Next.js", "CodeMirror"] },
    { name: "learnDSA", kind: "edu", one: "Data structures and algorithms you step through by hand, with honest complexity tables.", stack: ["Next.js", "Framer Motion"] },
    { name: "Longhorn Macros", kind: "app", one: "A phone-first food log for UT dining halls: pick what you ate at J2, JCL or Kins and see macros left today.", stack: ["Preact", "Supabase", "PWA"] },
    { name: "Probe", kind: "venture", one: "An AI camera workflow for plumbing, HVAC and electrical field teams.", stack: ["vision models", "mobile"] },
    { name: "Doe Clicker", kind: "game", one: "A cosmic-horror idle game. Feed the Doe.", stack: ["React 19", "TypeScript"] }
  ],
  skills: {
    languages: ["TypeScript", "Python", "C++", "Java", "Swift", "SQL"],
    areas: ["Competitive programming", "Quant modeling", "ML research", "NLP", "Agent systems", "Frontend architecture", "iOS"]
  },
  facts: ["Started coding at 12 in Swift Playgrounds", "Plays volleyball, table tennis and soccer", "Shoots photos on a Kodak FZ55"]
};
