import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { title: "Lumina Dashboard", category: "UI/UX Design", image: project1, year: "2024", desc: "A comprehensive analytics dashboard with real-time data visualization and intuitive navigation." },
  { title: "Brand Identity System", category: "Branding", image: project2, year: "2024", desc: "Complete brand overhaul including logo, typography, color system, and brand guidelines." },
  { title: "Mobile Experience", category: "App Design", image: project3, year: "2023", desc: "Cross-platform mobile application focused on user engagement and seamless interactions." },
  { title: "E-Commerce Platform", category: "Web Development", image: project1, year: "2023", desc: "Full-stack e-commerce solution with custom CMS and payment integration." },
  { title: "Creative Portfolio", category: "Web Design", image: project2, year: "2022", desc: "Award-winning portfolio website with immersive animations and storytelling." },
];

const Work = () => (
  <PageTransition>
    <div className="noise-overlay min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <RevealText>
          <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Portfolio</span>
        </RevealText>
        <RevealText delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
            Selected<br />
            <span className="text-gradient">Work</span>
          </h1>
        </RevealText>

        {/* Asymmetric grid layout */}
        <div className="mt-20 space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={`floating-card group cursor-pointer ${i % 2 === 0 ? "md:ml-0 md:mr-20" : "md:ml-20 md:mr-0"}`}
            >
              <div className={`grid md:grid-cols-2 gap-0 ${i % 2 !== 0 ? "md:direction-rtl" : ""}`}>
                <div className="relative overflow-hidden h-72 md:h-96">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mt-3 group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-sm font-detail text-text-subtle mt-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <motion.div className="mt-6" whileHover={{ x: 5 }}>
                    <span className="text-sm font-detail text-text-subtle group-hover:text-primary transition-colors inline-flex items-center gap-2">
                      View Project
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Work;
