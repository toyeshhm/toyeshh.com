import { motion, useReducedMotion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";
import SectionDivider from "@/components/SectionDivider";
import { getProjectBySlug } from "@/lib/projects";

const WorkProjectDetail = () => {
  const shouldReduceMotion = useReducedMotion();
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  if (!project) {
    return (
      <PageTransition>
        <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
              Project not found
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">
              This project does not exist.
            </h1>
            <div className="mt-8">
              <Link to="/work">
                <MagneticButton className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                  Back to work
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-detail text-text-subtle hover:text-primary transition-colors"
            >
              <span aria-hidden>←</span>
              Back to work
            </Link>
            <div className="mt-6">
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase block">
                {project.category} · {project.year}
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-tight">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-text-subtle font-detail text-base md:text-lg leading-relaxed">
                {project.desc}
              </p>
            </div>
          </div>

          <div className="mt-10 md:mt-12">
            <SectionDivider />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.65)]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
            </motion.div>

            <div className="space-y-8">
              <motion.section
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="rounded-[2rem] border border-border/70 bg-card/80 backdrop-blur-sm p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  Project Overview
                </h2>
                <p className="mt-4 text-sm md:text-base font-detail text-text-subtle leading-relaxed">
                  {project.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-detail text-text-subtle"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="rounded-[2rem] border border-border/70 bg-card/80 backdrop-blur-sm p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  What I Did
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm md:text-base font-detail text-text-subtle leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/work">
              <MagneticButton className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                Back to all work
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <MagneticButton className="px-8 py-4 rounded-full border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors">
                Start a project
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WorkProjectDetail;
