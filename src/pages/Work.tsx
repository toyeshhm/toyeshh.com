import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import project1 from "@/assets/Ultra.png";
import project2 from "@/assets/WearItForward.png";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    title: "Ultra (YC W24) AI College Guidance",
    category: "EdTech Startup",
    type: "work",
    image: project1,
    year: "2025",
    desc: "Co-built frontend and AI systems for an accessible college-guidance product serving 10K+ students, while partnering 1:1 with the CEO.",
  },
  {
    title: "WearItForward Humanitarian Nonprofit",
    category: "Volunteering + Product",
    type: "projects",
    image: project2,
    year: "2025",
    desc: "Co-founded a humanitarian initiative that donated $160K+ in clothing, led a 20+ person team, and delivered 70+ media assets.",
  },
  {
    title: "Quantum ML Crop Disease Detection",
    category: "Quantum ML Research",
    type: "research",
    image: project3,
    year: "2025",
    desc: "Built a Quantum ML pipeline trained on 10K+ crop images, improving disease-detection accuracy by 20% over a classical CNN baseline.",
  },
  {
    title: "UTD NLP Art-Critique Framework",
    category: "NLP Research",
    type: "work",
    image: project1,
    year: "2025",
    desc: "Developed a first-author NLP framework with 840+ examples to evaluate AI-generated art critiques and quantify bias patterns.",
  },
  {
    title: "NYAS NanoChar Initiative",
    category: "Research + Website",
    type: "projects",
    image: project2,
    year: "2025",
    desc: "Led a six-person team, produced 30+ design concepts, and built the project website for a biodegradable air filter showing 63% lower cell damage.",
  },
];

const filters = ["everything", "work", "research", "projects"] as const;
type FilterType = (typeof filters)[number];

const Work = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>("everything");

  const visibleProjects = useMemo(
    () =>
      activeFilter === "everything"
        ? projects
        : projects.filter((project) => project.type === activeFilter),
    [activeFilter],
  );

  const baseProjects = useMemo(() => {
    const base = visibleProjects.length > 0 ? visibleProjects : projects;
    return base;
  }, [visibleProjects]);

  const topRowProjects = useMemo(() => {
    const evenItems = baseProjects.filter((_, index) => index % 2 === 0);
    const source = evenItems.length > 0 ? evenItems : baseProjects;
    return [...source, ...source];
  }, [baseProjects]);

  const bottomRowProjects = useMemo(() => {
    const oddItems = baseProjects.filter((_, index) => index % 2 === 1);
    const source = oddItems.length > 0 ? oddItems : baseProjects;
    return [...source, ...source];
  }, [baseProjects]);

  return (
    <PageTransition>
      <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <RevealText>
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                Portfolio
              </span>
            </RevealText>
            <RevealText delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
                Selected
                <br />
                <span className="text-gradient">Work</span>
              </h1>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-text-subtle font-detail text-base md:text-lg leading-relaxed"
            >
              A centered, motion-led presentation inspired by editorial hero
              animations, tuned to stay light, balanced, and easy to follow.
            </motion.p>
          </div>

          <div className="mt-8 md:mt-10 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/70 bg-card/70 p-2 backdrop-blur-sm">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm font-detail tracking-wide capitalize transition-colors ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-text-subtle hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <SectionDivider />
          </div>

          <div className="mt-8 md:mt-10 relative left-1/2 right-1/2 w-screen -translate-x-1/2">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
              <div className="w-[34rem] h-[34rem] md:w-[48rem] md:h-[48rem] rounded-full bg-primary/6 blur-3xl" />
            </div>

            <div className="relative overflow-hidden py-2 space-y-6 md:space-y-8 px-3 sm:px-5 md:px-8 lg:px-10">
              {[topRowProjects, bottomRowProjects].map(
                (rowProjects, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    className="flex items-stretch gap-6 md:gap-8 w-max py-1"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: rowIndex === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: rowIndex === 0 ? 30 : 34,
                            repeat: Infinity,
                            ease: "linear",
                          }
                    }
                    style={{ willChange: "transform" }}
                  >
                    {rowProjects.map((project, index) => (
                      <motion.article
                        key={`${project.title}-${rowIndex}-${index}`}
                        className="shrink-0 will-change-transform"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -6, scale: 1.01 }
                        }
                      >
                        <div className="group relative w-[20rem] sm:w-[24rem] md:w-[29rem] lg:w-[33rem] rounded-[2rem] overflow-hidden border border-border/70 bg-card/80 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.65)] backdrop-blur-sm">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <motion.img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              width={1400}
                              height={788}
                              className="h-full w-full object-cover"
                              animate={
                                shouldReduceMotion
                                  ? undefined
                                  : { scale: [1, 1.03, 1] }
                              }
                              transition={
                                shouldReduceMotion
                                  ? undefined
                                  : {
                                      duration: 10 + index * 0.9,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: index * 0.35,
                                    }
                              }
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-background/10 to-transparent" />
                            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/25 to-transparent" />
                          </div>

                          <div className="p-4 md:p-5 border-t border-border/60 bg-background/75 backdrop-blur-md">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-[10px] md:text-xs font-detail text-text-dim tracking-[0.2em] uppercase block">
                                  {project.category} · {project.year}
                                </span>
                                <h3 className="mt-1.5 text-lg md:text-xl font-display font-bold text-foreground">
                                  {project.title}
                                </h3>
                              </div>
                              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/80 text-sm text-primary">
                                →
                              </span>
                            </div>
                            <p className="mt-2 text-xs md:text-sm font-detail text-text-subtle leading-relaxed max-w-2xl line-clamp-2">
                              {project.desc}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <div className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <MagneticButton className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                Start a project
              </MagneticButton>
            </Link>
            <Link to="/about">
              <MagneticButton className="px-8 py-4 rounded-full border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors">
                About me
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Work;
