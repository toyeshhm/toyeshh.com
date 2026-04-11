import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";
import { CONTACT } from "@/lib/contact";

const infoCards = [
  { label: "LOCATION", value: CONTACT.location },
  { label: "EDUCATION", value: "Turing Scholar (CS Honors) @ UT Austin '30" },
  { label: "FOCUS", value: "Quant, AI/ML, & SWE" },
  { label: "STATUS", value: "Available for work", highlight: true },
];

const aboutHeroBadge = { number: "4+", line2: "Years of experience" };

const experience = [
  {
    role: "Research Team Lead & Alumni Officer",
    company: "The New York Academy of Sciences",
    projectSlug: "nyas-nanochar-initiative",
    period: "Mar 2025 — Present",
    type: "Internship + Seasonal · Remote",
    points: [
      "Selected in the top 10% of global applicants and led a 6-person international team on NanoChar.",
      "Directed modeling and prototype design, surveyed 100+ users, and achieved a 63% reduction in average cellular damage.",
      "Project placed 2nd/119 and was showcased at the 2025 International Student Symposium; later recognized as a NYAS Young Member and invited to the JCSVEI alumni network.",
    ],
  },
  {
    role: "Research Intern",
    company: "The University of Texas at Dallas",
    projectSlug: "utd-nlp-art-critique-framework",
    period: "Jun 2025 — Sep 2025",
    type: "Internship · On-site",
    points: [
      "Built NLP and multimodal pipelines under Dr. Chris Davis for large-scale language and art-critique analysis.",
      "Introduced the Creative Coherence Score (CCS) and created the ArtCriq dataset with 850+ annotated critiques.",
      "Reduced cultural bias by 38% through LoRA fine-tuning across GPT-4, Claude 3, and Llama-3.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Ultra",
    projectSlug: "ultra-yc-w24-ai-college-guidance",
    period: "Jan 2025 — Aug 2025",
    type: "Internship · Remote",
    points: [
      "Built and optimized Ultra's landing experience to improve conversion and retention.",
      "Shipped performance and accessibility upgrades across the frontend architecture.",
      "Integrated GPT-powered roadmap features with full CRUD and prototyped a RAG-based startup guidance assistant.",
    ],
  },
  {
    role: "Quantum Machine Learning Researcher",
    company: "Non-Trivial",
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

const awards = [
  {
    title: "NYAS Research Finalist",
    detail: "2nd/119 teams. Associated with The New York Academy of Sciences.",
    year: "Issued by New York Academy of Sciences · Jul 2025",
    projectSlug: "nyas-nanochar-initiative",
  },
  {
    title: "BPA NLC Competitor",
    detail:
      "Financial Portfolio Management: 1st/200+ internationally. Java Programming: 12th internationally and 3rd in Texas.",
    year: "Issued by BPA · May 2025",
  },
  {
    title: "SIAM International M3 MathWorks Math Modeling Challenge Finalist",
    detail: "6th/770+ teams in 2026 ($5,000 prize); Top 150 teams in 2025.",
    year: "Issued by SIAM · Mar 2025",
    projectSlug: "m3-mathworks-math-modeling-challenge-finalist",
  },
  {
    title: "Texas DECA ICDC Alternate",
    detail:
      "Qualified for state in the Marketing Cluster 4 consecutive years (2023-2026); State Finalist 2025 (ICDC Alternate).",
    year: "Issued by DECA · Jan 2025",
  },
];

const About = () => (
  <PageTransition>
    <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Hero — editorial two-column (reference layout) */}
        <section className="pb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <span
              className="h-px w-10 md:w-12 bg-primary shrink-0"
              aria-hidden
            />
            <span className="text-[11px] md:text-xs font-detail text-primary tracking-[0.2em] uppercase">
              About me
            </span>
          </motion.div>

          <RevealText>
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.15rem] font-editorial font-medium text-foreground leading-[1.12] tracking-tight max-w-4xl">
              Building towards the future
            </h1>
          </RevealText>

          <div className="mt-12 lg:mt-16 grid lg:grid-cols-[minmax(260px,380px)_1fr] gap-10 lg:gap-14 xl:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
            >
              <div className="relative rounded-[2.25rem] md:rounded-[2.5rem] overflow-hidden border border-border/60 bg-card aspect-[3/4] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]">
                <img
                  src={profileImg}
                  alt="Toyeshh"
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 rounded-2xl bg-[#0a0a0a]/92 border border-border/50 backdrop-blur-md px-4 py-3 md:px-5 md:py-3.5 shadow-lg min-w-[7.5rem]">
                <p className="font-editorial text-2xl md:text-3xl text-primary leading-none font-semibold">
                  {aboutHeroBadge.number}
                </p>
                <p className="mt-1 text-[10px] md:text-xs font-detail text-foreground/90 tracking-wide uppercase leading-snug">
                  {aboutHeroBadge.line2}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.75 }}
              className="space-y-0"
            >
              <p className="font-editorial text-lg md:text-xl lg:text-[1.35rem] text-foreground leading-relaxed">
                Hey, I&apos;m Toyeshh, an incoming freshman at UT Austin focused
                on building the{" "}
                <span className="text-primary not-italic">future </span>
                of technology.
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
              </div>
            </motion.div>
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
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.role + exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-[6px] w-4 h-4 md:w-[18px] md:h-[18px] rounded-full border-2 border-primary bg-background z-10" />

                    <Link
                      to={`/work/${exp.projectSlug}`}
                      className="group block p-5 -m-5 rounded-xl transition-colors duration-500 hover:bg-surface-hover/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-1">
                        <div>
                          <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-detail text-text-subtle mt-0.5">
                            {exp.company}
                          </p>
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Honors */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                <span className="text-gradient">Awards</span>
              </h2>
            </RevealText>

            <div className="grid sm:grid-cols-2 gap-5 mt-12">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  {award.projectSlug ? (
                    <Link
                      to={`/work/${award.projectSlug}`}
                      className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 transition-colors duration-500"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="text-primary text-sm font-display font-bold">
                          ★
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-semibold group-hover:text-primary transition-colors">
                          {award.title}
                        </h3>
                        <p className="text-xs font-detail text-text-dim mt-1">
                          {award.detail}
                        </p>
                        <span className="text-xs font-detail text-text-dim/60 mt-1 block">
                          {award.year}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 transition-colors duration-500">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="text-primary text-sm font-display font-bold">
                          ★
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-semibold group-hover:text-primary transition-colors">
                          {award.title}
                        </h3>
                        <p className="text-xs font-detail text-text-dim mt-1">
                          {award.detail}
                        </p>
                        <span className="text-xs font-detail text-text-dim/60 mt-1 block">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default About;
