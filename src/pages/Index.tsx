import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const featuredProjects = [
    { title: "Lumina Dashboard", category: "UI/UX Design", image: project1, year: "2024" },
    { title: "Brand Identity System", category: "Branding", image: project2, year: "2024" },
    { title: "Mobile Experience", category: "App Design", image: project3, year: "2023" },
  ];

  return (
    <PageTransition>
      <div className="noise-overlay">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0"
          >
            <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </motion.div>

          {/* Floating organic blob */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-[10%] w-[400px] h-[400px] organic-blob opacity-[0.04]"
            style={{ background: "linear-gradient(135deg, hsl(28 80% 52%), hsl(15 85% 45%))" }}
          />

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
              <div className="pt-32 lg:pt-0">
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
                  I craft digital experiences that blend aesthetics with functionality. 
                  Focused on creating meaningful products that resonate.
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
                transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="hidden lg:block relative"
              >
                <div className="w-[320px] h-[400px] rounded-[2rem] overflow-hidden relative">
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-8 glass-panel px-5 py-3"
                >
                  <span className="text-xs font-detail text-text-subtle">Based in</span>
                  <p className="text-sm font-body text-foreground">Worldwide · Remote</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-center gap-3"
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
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Scroll</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Work */}
        <section className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <SectionDivider />
          <div className="mt-20 mb-16 flex items-end justify-between">
            <div>
              <RevealText>
                <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Selected Work</span>
              </RevealText>
              <RevealText delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
                  Featured<br />
                  <span className="text-gradient">Projects</span>
                </h2>
              </RevealText>
            </div>
            <Link to="/work">
              <motion.span
                whileHover={{ x: 5 }}
                className="text-sm font-detail text-text-subtle hover:text-primary transition-colors hidden md:block"
              >
                View all →
              </motion.span>
            </Link>
          </div>

          <div className="space-y-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="floating-card group cursor-pointer"
              >
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold mt-3 group-hover:text-primary transition-colors duration-500">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <span className="text-sm font-detail text-text-dim">{project.year}</span>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-sm font-detail text-text-subtle group-hover:text-primary transition-colors"
                      >
                        View →
                      </motion.span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden h-64 md:h-80">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/50" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Strip */}
        <section className="py-20 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {["Web Development", "UI/UX Design", "Brand Identity", "Creative Direction", "Motion Design"].map((service) => (
                  <span key={`${service}-${i}`} className="text-4xl md:text-6xl font-display font-bold text-muted/50 flex items-center gap-12">
                    {service}
                    <span className="w-3 h-3 rounded-full bg-primary/30" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
          <SectionDivider />
          <div className="mt-20">
            <RevealText>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                Let's create<br />
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
            <span className="text-sm font-detail text-text-dim">© 2024 · Crafted with intention</span>
            <div className="flex gap-6">
              {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((s) => (
                <a key={s} href="#" className="text-sm font-detail text-text-dim hover:text-primary transition-colors">
                  {s}
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
