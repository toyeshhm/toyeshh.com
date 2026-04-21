import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import SectionDivider from "@/components/SectionDivider";
import TerminalWindow from "@/components/TerminalWindow";
import { CONTACT } from "@/lib/contact";

const infoCards = [
  { label: "LOCATION", value: CONTACT.location },
  { label: "EDUCATION", value: "Turing Scholar (CS Honors) @ UT Austin '30" },
  { label: "FOCUS", value: "Quant, AI/ML, & SWE" },
  { label: "STATUS", value: "Available for work", highlight: true },
];

const calLinks = {
  calLink15:
    "https://cal.com/toyeshh-medikonda-imd7i7/15min?overlayCalendar=true",
  calLink30:
    "https://cal.com/toyeshh-medikonda-imd7i7/30min?overlayCalendar=true",
};

const experience = [
  {
    role: "Research Team Lead & Alumni Officer",
    company: "The New York Academy of Sciences",
    logo: "/logos/nyas.png",
    projectSlug: "nyas-nanochar-research",
    period: "Mar 2025 — Present",
    type: "Internship + Seasonal · Remote",
    points: [
      "Selected in the top 10% of global applicants and led a 6-person international team on NanoChar.",
      "Sketched 30+ designs and created project website; directed modeling and prototype design; achieved 63% reduction in average cellular damage.",
      "Project placed 2nd/119 and was showcased at the 2025 International Student Symposium; recognized as NYAS Young Member and invited to JCSVEI alumni network.",
    ],
  },
  {
    role: "Summer Research Intern & First Author",
    company: "The University of Texas at Dallas",
    logo: "/logos/utd.png",
    projectSlug: "utd-nlp-art-critique-framework", 
    period: "Jun 2025 — Sep 2025",
    type: "Internship · On-site",
    points: [
      "Developed NLP framework for evaluating AI-generated art critiques; paper published @ UTD.",
      "Created the ArtCriq dataset with 840+ annotated critiques and introduced the Creative Coherence Score (CCS).",
      "Reduced cultural bias by 38% through LoRA fine-tuning across GPT-4, Claude 3, and Llama-3.",
    ],
  },
  {
    role: "Paid Founding Technical Engineer & UI/UX Lead",
    company: "Ultra (YC W24)",
    logo: "/logos/ultra.png",
    projectSlug: "ultra-yc-w24-ai-college-guidance",
    period: "Jan 2025 — Aug 2025",
    type: "Internship · Remote",
    points: [
      "Co-built frontend & AI systems for accessible college-guidance platform helping 10K+ students.",
      "Worked 1:1 with CEO on product strategy; shipped performance and accessibility upgrades across the frontend.",
      "Grew Discord community from 20 to 2,500+ members; won $3K+ prize for community impact.",
    ],
  },
  {
    role: "Quantum Machine Learning Researcher",
    company: "Non-Trivial",
    logo: "/logos/nontrivial.png",
    projectSlug: "quantum-ml-crop-disease-detection",
    period: "Mar 2025 — Jul 2025",
    type: "Part-time · Remote",
    points: [
      "Selected among the top 6% globally for the Non-Trivial research fellowship.",
      "Designed a QCNN pipeline for crop disease detection with angle/amplitude encoding and cGAN-based augmentation.",
      "Trained on 10K+ plant images and achieved 20% higher accuracy than a classical CNN baseline.",
    ],
  },
];

const coursesByTerm = [
  {
    term: "Fall 2026",
    courses: [
      "CS 311H: Discrete Math",
      "CS 314H: Data Structures",
      "CS 109: Think Lab",
      "M 340L: Matrices & Matrix Calcs",
      "UGS 303: Undergraduate Studies",
      "CC 301: Ancient Greece Intro",
    ],
  },
];

const About = () => (
  <PageTransition>
    <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Hero — editorial two-column (reference layout) */}
        <section className="pb-4">
          <div className="mt-2 lg:mt-6 grid lg:grid-cols-[minmax(320px,460px)_1fr] gap-10 lg:gap-14 xl:gap-20 items-start">
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px] xl:max-w-[500px]">
              <div className="terminal-frame-rounded relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden border border-border/60 bg-card aspect-[3/4] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]">
                <TerminalWindow className="h-full w-full" />
              </div>
            </div>

            <div className="space-y-0">
              <p className="font-detail text-lg md:text-xl lg:text-[1.35rem] text-foreground leading-relaxed">
                Hey, I&apos;m Toyeshh, a freshman at UT Austin.
              </p>
              <div className="mt-6 md:mt-8 space-y-4">
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"></p>
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"></p>
              </div>
              <div className="mt-6 md:mt-8 space-y-4">
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed">
                  I have experience in full-stack web development, machine
                  learning, and research in NLP and AI through internships,
                  fellowships, and edtech work.
                </p>
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed">
                  When I&apos;m not coding or researching, you&apos;ll find me
                  exploring the latest tech or generating ideas for an
                  innovative startup.
                </p>
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"></p>
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"></p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10 mt-10 md:mt-12 pt-10 border-t border-border/80">
                {infoCards.map((card) => (
                  <div key={card.label} className="min-w-0">
                    <span className="text-[10px] md:text-xs font-detail text-primary tracking-[0.18em] uppercase block">
                      {card.label}
                    </span>
                    <p
                      className={`mt-2 text-sm md:text-[0.9375rem] font-detail leading-snug ${
                        card.highlight ? "text-primary" : "text-foreground/95"
                      }`}
                    >
                      {card.value}
                    </p>
                  </div>
                ))}
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"></p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-10 pt-8 md:pt-10 border-t border-border/50">
                <a
                  href={calLinks.calLink15}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-3 md:py-3.5 rounded-lg border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors duration-300 font-detail text-sm md:text-[0.95rem] font-medium text-primary hover:text-primary/90"
                >
                  Quick call (15 min)
                </a>
                <a
                  href={calLinks.calLink30}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-3 md:py-3.5 rounded-lg border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors duration-300 font-detail text-sm md:text-[0.95rem] font-medium text-primary hover:text-primary/90"
                >
                  Deep dive (30 min+)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience — Vertical Timeline */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Experience
              </h2>
            </RevealText>

            <div className="mt-12 relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] md:left-[9px] top-3 bottom-3 w-px bg-border" />

              <div className="space-y-10">
                {experience.map((exp) => (
                  <div
                    key={exp.role + exp.company}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-[6px] w-4 h-4 md:w-[18px] md:h-[18px] rounded-full border-2 border-primary bg-background z-10" />

                    <Link
                      to={`/work/${exp.projectSlug}`}
                      className="group block p-5 -m-5 rounded-lg transition-colors duration-500 hover:bg-surface-hover/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-1">
                        <div className="flex items-start gap-3">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-card/70 flex items-center justify-center">
                            {exp.logo ? (
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-[11px] font-detail text-text-dim uppercase tracking-wide">
                                Logo
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-detail text-text-subtle mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        <div className="text-right mt-1 md:mt-0 shrink-0">
                          <span className="text-xs font-detail text-text-dim tracking-wider block">
                            {exp.period}
                          </span>
                          <span className="text-xs font-detail text-text-dim/60">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-sm font-detail text-text-dim leading-relaxed"
                          >
                            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Courses
              </h2>
            </RevealText>

            <div className="mt-12 grid gap-5">
              {coursesByTerm.map((termInfo) => (
                <div
                  key={termInfo.term}
                  className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm"
                >
                  <h3 className="text-lg md:text-xl font-display font-semibold text-primary">
                    {termInfo.term}
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    {termInfo.courses.map((course) => (
                      <li
                        key={course}
                        className="flex items-start gap-2.5 text-sm md:text-[0.95rem] font-detail text-text-dim leading-relaxed"
                      >
                        <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </PageTransition>
);

export default About;
