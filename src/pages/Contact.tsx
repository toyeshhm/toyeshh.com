import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      <div className="noise-overlay min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <RevealText>
                <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Get in Touch</span>
              </RevealText>
              <RevealText delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
                  Let's work<br />
                  <span className="text-gradient">together</span>
                </h1>
              </RevealText>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-text-subtle font-detail text-base leading-relaxed max-w-md"
              >
                Have a project in mind? I'd love to hear about it. Drop me a message 
                and let's create something extraordinary together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-12 space-y-6"
              >
                <div>
                  <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Email</span>
                  <p className="text-foreground font-body mt-1">hello@portfolio.dev</p>
                </div>
                <div>
                  <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Location</span>
                  <p className="text-foreground font-body mt-1">Worldwide · Remote</p>
                </div>
                <SectionDivider />
                <div className="flex gap-6 pt-4">
                  {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((s, i) => (
                    <motion.a
                      key={s}
                      href="#"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-sm font-detail text-text-dim hover:text-primary transition-colors"
                    >
                      {s}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-detail text-text-dim tracking-widest uppercase block mb-3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-border py-4 text-foreground font-body text-base placeholder:text-text-dim/50 focus:outline-none focus:border-primary transition-colors duration-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-detail text-text-dim tracking-widest uppercase block mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b border-border py-4 text-foreground font-body text-base placeholder:text-text-dim/50 focus:outline-none focus:border-primary transition-colors duration-500 resize-none"
                />
              </div>
              <div className="pt-4">
                <MagneticButton className="w-full py-5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                  Send Message
                </MagneticButton>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
