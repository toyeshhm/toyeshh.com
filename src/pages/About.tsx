import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";

const infoCards = [
  { label: "LOCATION", value: "Frisco, Texas" },
  { label: "EDUCATION", value: "Turing Scholar — UT Austin '30" },
  { label: "FOCUS", value: "CS, AI/ML & Full-Stack Dev" },
  { label: "STATUS", value: "Open to Opportunities", highlight: true },
];

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
    <div className="noise-overlay min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Hero Intro — inspired by reference image */}
        <section>
          <RevealText>
            <span className="text-xs font-detail text-text-dim tracking-widest uppercase">About Me</span>
          </RevealText>

          <RevealText delay={0.1}>
            <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-display font-bold mt-6 leading-[1.25] tracking-tight">
              I'm Toyeshh, a multidisciplinary developer and researcher based in Texas. I believe in building technology that feels{" "}
              <span className="text-gradient italic">human</span> — accessible, impactful, and deeply connected to the people it serves.
            </h1>
          </RevealText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 space-y-5"
          >
            <p className="text-text-subtle font-detail text-base leading-relaxed max-w-3xl">
              Hey, I'm Toyeshh — a high school senior and aspiring CS major with a focus on using tech to expand access to education and knowledge. I have experience in full-stack web development, machine learning, and research in NLP and AI through internships, fellowships, and edtech work.
            </p>
            <p className="text-text-subtle font-detail text-base leading-relaxed max-w-3xl">
              When I'm not coding or researching, you'll find me exploring generative art, diving into math competitions, or working on education nonprofits. I believe the best creative work comes from a life lived with curiosity and openness.
            </p>
          </motion.div>

          {/* Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-border"
          >
            {infoCards.map((card) => (
              <div key={card.label}>
                <span className="text-xs font-detail text-primary tracking-widest uppercase">{card.label}</span>
                <p className={`mt-2 text-sm font-body ${card.highlight ? "text-primary underline underline-offset-4" : "text-foreground"}`}>
                  {card.value}
                </p>
              </div>
            ))}
          </motion.div>
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
