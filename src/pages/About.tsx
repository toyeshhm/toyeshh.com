import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "UI/UX Design", level: 88 },
  { name: "Figma", level: 92 },
  { name: "Motion Design", level: 85 },
  { name: "Node.js", level: 80 },
];

const experience = [
  { role: "Senior Creative Developer", company: "Studio Flux", year: "2022 — Present", desc: "Leading design engineering for high-profile clients." },
  { role: "UI/UX Designer", company: "Digital Atelier", year: "2020 — 2022", desc: "Designed and shipped 20+ digital products." },
  { role: "Frontend Developer", company: "Pixel & Code", year: "2018 — 2020", desc: "Built performant web applications with modern stacks." },
];

const About = () => (
  <PageTransition>
    <div className="noise-overlay min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Intro */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div>
            <RevealText>
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase">About Me</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
                Designing at the<br />
                <span className="text-gradient">intersection</span> of<br />
                art & technology
              </h1>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-text-subtle font-detail text-base leading-relaxed max-w-lg"
            >
              I'm a creative developer and designer with 6+ years of experience crafting digital 
              experiences that feel intentional and alive. I believe in the power of thoughtful design 
              and clean code to transform ideas into memorable products.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-text-subtle font-detail text-base leading-relaxed max-w-lg"
            >
              When I'm not designing or coding, you'll find me exploring new places, 
              experimenting with photography, or diving into the latest design trends.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden aspect-[3/4]">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass-panel px-6 py-4"
            >
              <span className="text-3xl font-display font-bold text-gradient">6+</span>
              <p className="text-xs font-detail text-text-dim mt-1">Years of<br/>Experience</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Skills & <span className="text-gradient">Expertise</span>
              </h2>
            </RevealText>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-body text-foreground">{skill.name}</span>
                    <span className="text-xs font-detail text-text-dim">{skill.level}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(28 80% 52%), hsl(15 85% 55%))" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-32">
          <SectionDivider />
          <div className="mt-16">
            <RevealText>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Experience
              </h2>
            </RevealText>
            <div className="mt-12 space-y-0">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="py-8 border-b border-border group hover:bg-surface-hover/30 px-4 -mx-4 rounded-xl transition-colors duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">{exp.role}</h3>
                      <p className="text-sm font-detail text-text-subtle mt-1">{exp.company}</p>
                    </div>
                    <span className="text-xs font-detail text-text-dim tracking-wider">{exp.year}</span>
                  </div>
                  <p className="text-sm font-detail text-text-dim mt-3">{exp.desc}</p>
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
