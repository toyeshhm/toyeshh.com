import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";

const projects = [
  {
    title: "Lumina Dashboard",
    category: "Product Design",
    description:
      "A polished analytics dashboard with motion, dense data visualization, and a focus on clarity under pressure.",
  },
  {
    title: "Brand Identity System",
    category: "Visual Design",
    description:
      "A cohesive identity toolkit that translates across web, social, and presentation surfaces without losing character.",
  },
  {
    title: "Mobile Experience",
    category: "App Interface",
    description:
      "A responsive mobile flow designed to keep the core actions fast, legible, and easy to complete one-handed.",
  },
];

const Work = () => (
  <PageTransition>
    <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <section>
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
              Selected work
            </span>
          </motion.div>

          <RevealText>
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.15rem] font-editorial font-medium text-foreground leading-[1.12] tracking-tight max-w-4xl">
              Projects built to feel intentional, sharp, and useful
            </h1>
          </RevealText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-2xl text-[0.9375rem] md:text-base text-muted-foreground font-detail leading-relaxed"
          >
            This page highlights the kind of work I enjoy: clear interfaces,
            strong systems, and details that make the experience feel finished.
          </motion.p>
        </section>

        <div className="mt-16 md:mt-20">
          <SectionDivider />
          <div className="mt-14 grid gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.65 }}
                className="group rounded-[1.75rem] border border-border/70 bg-card/40 backdrop-blur-sm p-6 md:p-8 hover:border-primary/30 transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <span className="text-[11px] md:text-xs font-detail text-primary tracking-[0.2em] uppercase">
                      {project.category}
                    </span>
                    <h2 className="mt-3 text-2xl md:text-3xl font-display font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  <div className="text-sm font-detail text-text-dim md:text-right max-w-sm leading-relaxed">
                    {project.description}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-4">
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

export default Work;
