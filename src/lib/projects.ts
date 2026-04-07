import project1 from "@/assets/Ultra.png";
import project2 from "@/assets/WearItForward.png";
import project3 from "@/assets/NonTrivial.png";
import project4 from "@/assets/ArtCriq.png";
import project5 from "@/assets/NYAS.png";

export const projectFilters = [
  "everything",
  "work",
  "research",
  "projects",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  slug: string;
  title: string;
  category: string;
  type: Exclude<ProjectFilter, "everything">;
  image: string;
  year: string;
  desc: string;
  details: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "ultra-yc-w24-ai-college-guidance",
    title: "Ultra (YC W24) AI College Guidance",
    category: "EdTech Startup",
    type: "work",
    image: project1,
    year: "2025",
    desc: "Co-built frontend and AI systems for an accessible college-guidance product serving 10K+ students, while partnering 1:1 with the CEO.",
    details: [
      "Built product-facing frontend experiences for students and counselors.",
      "Collaborated directly with the founder on product direction and shipping cadence.",
      "Focused on clarity, speed, and accessibility across the experience.",
    ],
    highlights: [
      "10K+ students reached",
      "Founder collaboration",
      "Accessible UX",
    ],
  },
  {
    slug: "wear-it-forward-nonprofit",
    title: "WearItForward Nonprofit",
    category: "Volunteering + Product",
    type: "projects",
    image: project2,
    year: "2025",
    desc: "Co-founded a humanitarian initiative that donated $160K+ in clothing, led a 20+ person team, and delivered 70+ media assets.",
    details: [
      "Helped coordinate operations across a 20+ person volunteer team.",
      "Created media assets and web presentation for the initiative.",
      "Supported logistics that moved donated materials into impact.",
    ],
    highlights: ["$160K+ donated", "20+ person team", "70+ media assets"],
  },
  {
    slug: "quantum-ml-crop-disease-detection",
    title: "Quantum ML Crop Disease Detection",
    category: "Quantum ML Research",
    type: "research",
    image: project3,
    year: "2025",
    desc: "Built a Quantum ML pipeline trained on 10K+ crop images, improving disease-detection accuracy by 20% over a classical CNN baseline.",
    details: [
      "Designed the pipeline for a research comparison against a classical baseline.",
      "Worked with a large crop-image dataset and evaluated model performance.",
      "Focused on measurable accuracy gains and reproducible experimentation.",
    ],
    highlights: ["10K+ images", "20% accuracy gain", "Research pipeline"],
  },
  {
    slug: "utd-nlp-art-critique-framework",
    title: "UTD NLP Art-Critique Framework",
    category: "NLP Research",
    type: "research",
    image: project4,
    year: "2025",
    desc: "Developed a first-author NLP framework with 840+ examples to evaluate AI-generated art critiques and quantify bias patterns.",
    details: [
      "Built the framework to study quality and bias in generated critique text.",
      "Prepared a labeled set of examples for analysis and evaluation.",
      "Translated research goals into a concrete, testable workflow.",
    ],
    highlights: ["840+ examples", "Bias analysis", "First-author framework"],
  },
  {
    slug: "nyas-nanochar-initiative",
    title: "NYAS NanoChar Initiative",
    category: "Research + Website",
    type: "research",
    image: project5,
    year: "2025",
    desc: "Led a six-person team, produced 30+ design concepts, and built the project website for a biodegradable air filter showing 63% lower cell damage.",
    details: [
      "Led design and web presentation for the initiative.",
      "Coordinated a small team through concept development and delivery.",
      "Presented the research through a clear public-facing website.",
    ],
    highlights: [
      "6-person team",
      "30+ design concepts",
      "63% lower cell damage",
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectsByFilter = (filter: ProjectFilter) =>
  filter === "everything"
    ? projects
    : projects.filter((project) => project.type === filter);
