import { motion } from "framer-motion";

const SectionDivider = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
    className="h-px w-full origin-left"
    style={{ background: "linear-gradient(90deg, transparent, hsl(28 80% 52% / 0.3), transparent)" }}
  />
);

export default SectionDivider;
