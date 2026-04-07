import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { socialLinks } from "@/lib/contact";
import { projects, type Project } from "@/lib/projects";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const shouldReduceMotion = useReducedMotion();

  const featuredProjects: Project[] = projects;
  const featuredBannerProjects = [...featuredProjects, ...featuredProjects];

  return (
    <PageTransition>
      <div className="noise-overlay">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col overflow-hidden"
        >
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0"
          >
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </motion.div>

          {/* Floating organic blob */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-[10%] w-[400px] h-[400px] organic-blob opacity-[0.04]"
            style={{
              background:
                "linear-gradient(135deg, hsl(28 80% 52%), hsl(15 85% 45%))",
            }}
          />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 flex flex-1 flex-col w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 min-h-0"
          >
            <div className="flex-1 flex items-center pt-28 pb-8 lg:py-0 min-h-0">
              <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end w-full">
                <div className="pt-4 lg:pt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="glow-dot" />
                    <span className="text-sm font-detail text-text-subtle tracking-widest uppercase">
                      Available for projects
                    </span>
                  </motion.div>

                  <RevealText>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.95] tracking-tight">
                      Creative
                    </h1>
                  </RevealText>
                  <RevealText delay={0.1}>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.95] tracking-tight text-gradient">
                      Developer
                    </h1>
                  </RevealText>
                  <RevealText delay={0.2}>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.95] tracking-tight">
                      & Designer
                    </h1>
                  </RevealText>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-8 max-w-md text-text-subtle font-detail text-base leading-relaxed"
                  >
                    I craft digital experiences that blend aesthetics with
                    functionality. Focused on creating meaningful products that
                    resonate.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-4 mt-10"
                  >
                    <Link to="/work">
                      <MagneticButton className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                        View Work
                      </MagneticButton>
                    </Link>
                    <Link to="/contact">
                      <MagneticButton className="px-8 py-4 rounded-full border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors">
                        Get in Touch
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </div>

                {/* Profile image - asymmetric placement */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="hidden lg:block relative"
                >
                  <div className="w-[320px] h-[400px] rounded-[2rem] overflow-hidden relative">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-6 -left-8 glass-panel px-5 py-3"
                  >
                    <span className="text-xs font-detail text-text-subtle">
                      Based in
                    </span>
                    <p className="text-sm font-body text-foreground">
                      Frisco, TX
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator — own row so it never overlaps CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="shrink-0 flex justify-center sm:justify-end items-center gap-3 pb-8 md:pb-10 pt-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 h-8 rounded-full border border-border flex justify-center pt-1.5"
              >
                <motion.div
                  animate={{ opacity: [1, 0], y: [0, 6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-primary"
                />
              </motion.div>
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Work — moving banner */}
        <section className="py-32 overflow-hidden">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <SectionDivider />
            <div className="mt-20 mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <RevealText>
                  <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                    Selected Work
                  </span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
                    Featured
                    <br />
                    <span className="text-gradient">Projects</span>
                  </h2>
                </RevealText>
              </div>
              <Link to="/work">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="text-sm font-detail text-text-subtle hover:text-primary transition-colors inline-block"
                >
                  View all →
                </motion.span>
              </Link>
            </div>
          </div>

          <div className="relative mt-4">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-background to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-background to-transparent"
              aria-hidden
            />

            <motion.div
              className="flex w-max items-stretch gap-6 md:gap-8 py-4 md:py-6 pl-6 md:pl-12 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 md:pr-12"
              animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              style={{ willChange: "transform" }}
            >
              {featuredBannerProjects.map((project, i) => (
                <motion.div
                  key={`${project.title}-${i}`}
                  className="shrink-0 will-change-transform"
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }
                  }
                >
                  <Link to={`/work/${project.slug}`} className="block group">
                    <div className="group relative w-[20rem] sm:w-[24rem] md:w-[29rem] lg:w-[33rem] rounded-[2rem] overflow-hidden border border-border/70 bg-card/80 transition-transform duration-500 ease-out">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                          width={1400}
                          height={788}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="p-5 md:p-6 border-t border-border/60 bg-background/80 backdrop-blur-md">
                        <span className="text-[10px] md:text-xs font-detail text-primary tracking-[0.2em] uppercase">
                          {project.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-display font-bold mt-2 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                          <span className="text-xs font-detail text-text-dim">
                            {project.year}
                          </span>
                          <span className="text-xs font-detail text-text-subtle group-hover:text-primary transition-colors flex items-center gap-1">
                            View case
                            <span
                              aria-hidden
                              className="inline-block transition-transform group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
          <SectionDivider />
          <div className="mt-20">
            <RevealText>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                Let's create
                <br />
                <span className="text-gradient">something great</span>
              </h2>
            </RevealText>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <Link to="/contact">
                <MagneticButton className="px-12 py-5 rounded-full bg-primary text-primary-foreground font-body text-base font-medium">
                  Start a Conversation
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <SectionDivider />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm font-detail text-text-dim">
              © 2026 · Crafted with intention
            </span>
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-detail text-text-dim hover:text-primary transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
