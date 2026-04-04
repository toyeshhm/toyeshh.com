import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";
import { CONTACT } from "@/lib/contact";

const infoCards = [
  { label: "LOCATION", value: CONTACT.location },
  { label: "EDUCATION", value: "Turing Scholar — UT Austin '30" },
  { label: "FOCUS", value: "CS, AI/ML & Full-Stack Dev" },
  { label: "STATUS", value: "Available for work", highlight: true },
];

const aboutHeroBadge = { number: "4+", line2: "Years of craft" };

const experience = [
  {
    role: "Alumni Officer",
    company: "The New York Academy of Sciences",
    period: "Jul 2025 — Present",
    type: "Seasonal · Remote",
    desc: "Recognized as a Young Member for outstanding leadership in science engagement. Invited to join the JCSVEI alumni network, a U.S. Department of State program administered by the Aspen Institute.",
  },
  {
    role: "Research Team Lead",
    company: "The New York Academy of Sciences",
    period: "Mar 2025 — Jul 2025",
    type: "Internship · Remote",
    desc: "Led a six-member international team investigating biochar–nanocellulose composites for sustainable air filtration. Created NanoChar prototype achieving 63% reduction in cellular damage. Placed 2nd out of 119 teams at the 2025 International Student Symposium.",
  },
  {
    role: "NLP Research Intern",
    company: "The University of Texas at Dallas",
    period: "Jun 2025 — Sep 2025",
    type: "Internship · On-site",
    desc: "Designed NLP pipelines for multimodal data analysis under Dr. Chris Davis. Created the Creative Coherence Score (CCS) and ArtCriqk dataset of 850+ annotated critiques. Fine-tuned GPT-4, Claude 3, and Llama-3 via LoRA, reducing cultural bias by 38%.",
  },
  {
    role: "Frontend Engineer",
    company: "Ultra (YC-backed)",
    period: "Jan 2025 — Aug 2025",
    type: "Internship · Remote",
    desc: "Engineered responsive landing page from scratch for a YC-backed college admissions AI startup. Integrated GPT API and dynamic scheduling into a Notion-style roadmap calendar. Prototyped a RAG model for conversational AI guidance.",
  },
  {
    role: "Quantum ML Researcher",
    company: "Non-Trivial Fellowship",
    period: "Mar 2025 — Jul 2025",
    type: "Part-time · Remote",
    desc: "Selected among top 6% of global applicants. Designed a Quantum Convolutional Neural Network (QCNN) for crop disease detection, achieving 20% accuracy improvement over classical CNNs on 10,000+ plant images. Authored a 13-page research paper.",
  },
];

const education = [
  {
    school: "Liberty High School",
    degree: "High School Diploma",
    period: "Aug 2022 — May 2026",
    details: "CS Club, BPA, DECA, Mu Alpha Theta, Math/Science/CS UIL, Science Olympiad, Key Club",
  },
  {
    school: "Collin College",
    degree: "Associate of Science (Dual Credit)",
    period: "Aug 2024 — May 2025",
    details: "Calculus III, Differential Equations",
  },
];

const awards = [
  { title: "NYAS Research Finalist", detail: "2nd / 119 teams internationally", year: "2025" },
  { title: "BPA NLC Competitor", detail: "1st / 200+ in Financial Portfolio Management", year: "2025" },
  { title: "Non-Trivial Fellow", detail: "Top 6% of global applicants", year: "2025" },
  { title: "IT Specialist — Java", detail: "Certiport Certification", year: "2025" },
];

const volunteering = {
  role: "Curriculum Coordinator",
  org: "ExcelAcademe",
  period: "Mar 2025 — Present",
  desc: "501(c)(3) education nonprofit sponsored by Wolfram & Jane Street, focused on making competitive academic opportunities accessible to all motivated students. Host free math contests and provide concept-driven learning resources.",
};

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
            <span className="h-px w-10 md:w-12 bg-primary shrink-0" aria-hidden />
            <span className="text-[11px] md:text-xs font-detail text-primary tracking-[0.2em] uppercase">
              About me
            </span>
          </motion.div>

          <RevealText>
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.15rem] font-editorial font-medium text-foreground leading-[1.12] tracking-tight max-w-4xl">
              Building at the intersection of research, code, and creativity
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
                I&apos;m Toyeshh — a developer and researcher based in Texas. I care about technology that feels{" "}
                <span className="text-primary not-italic">human</span>
                {" "}— accessible, impactful, and connected to the people it serves.
              </p>

              <div className="mt-6 md:mt-8 space-y-4">
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed">
                  Hey, I&apos;m Toyeshh — a high school senior and aspiring CS major focused on using tech to expand access to education
                  and knowledge. I have experience in full-stack web development, machine learning, and research in NLP and AI through
                  internships, fellowships, and edtech work.
                </p>
                <p className="text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed">
                  When I&apos;m not coding or researching, you&apos;ll find me exploring generative art, diving into math competitions, or
                  working with education nonprofits. The best creative work comes from curiosity and openness.
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

                    <div className="group hover:bg-surface-hover/30 p-5 -m-5 rounded-xl transition-colors duration-500">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-1">
                        <div>
                          <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">{exp.role}</h3>
                          <p className="text-sm font-detail text-text-subtle mt-0.5">{exp.company}</p>
                        </div>
                        <div className="text-right mt-1 md:mt-0 shrink-0">
                          <span className="text-xs font-detail text-text-dim tracking-wider block">{exp.period}</span>
                          <span className="text-xs font-detail text-text-dim/60">{exp.type}</span>
                        </div>
                      </div>
                      <p className="text-sm font-detail text-text-dim mt-3 leading-relaxed">{exp.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Education
              </h2>
            </RevealText>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="glass-panel p-6 group hover:border-primary/30 transition-colors duration-500"
                >
                  <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">{edu.school}</h3>
                  <p className="text-sm font-detail text-text-subtle mt-1">{edu.degree}</p>
                  <span className="text-xs font-detail text-text-dim tracking-wider mt-2 block">{edu.period}</span>
                  <p className="text-xs font-detail text-text-dim mt-3 leading-relaxed">{edu.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards & Honors */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Honors & <span className="text-gradient">Awards</span>
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
                  className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 transition-colors duration-500 group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-sm font-display font-bold">★</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold group-hover:text-primary transition-colors">{award.title}</h3>
                    <p className="text-xs font-detail text-text-dim mt-1">{award.detail}</p>
                    <span className="text-xs font-detail text-text-dim/60 mt-1 block">{award.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Volunteering */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Volunteering
              </h2>
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 glass-panel p-8 hover:border-primary/30 transition-colors duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">{volunteering.role}</h3>
                  <p className="text-sm font-detail text-text-subtle mt-0.5">{volunteering.org}</p>
                </div>
                <span className="text-xs font-detail text-text-dim tracking-wider">{volunteering.period}</span>
              </div>
              <p className="text-sm font-detail text-text-dim mt-4 leading-relaxed">{volunteering.desc}</p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  </PageTransition>
);

export default About;
