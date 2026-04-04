import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import { toast } from "@/components/ui/sonner";
import { CONTACT, socialLinks } from "@/lib/contact";

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) {
      toast.error("Please fill in every field.");
      return;
    }
    if (!FORMSPREE_URL) {
      toast.error("Contact form is not configured. Add VITE_FORMSPREE_URL to your .env file.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio: message from ${name}`,
        }),
      });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        const err =
          data &&
          typeof data === "object" &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Could not send your message. Try again later.";
        throw new Error(err);
      }
      toast.success("Message sent. I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
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
                  <p className="text-foreground font-body mt-1">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-detail text-text-dim tracking-widest uppercase">Location</span>
                  <p className="text-foreground font-body mt-1">{CONTACT.location}</p>
                </div>
                <SectionDivider />
                <div className="flex flex-wrap gap-6 pt-4">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-sm font-detail text-text-dim hover:text-primary transition-colors"
                    >
                      {s.label}
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
              onSubmit={handleSubmit}
              aria-busy={submitting}
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
                    disabled={submitting}
                    className="w-full bg-transparent border-b border-border py-4 text-foreground font-body text-base placeholder:text-text-dim/50 focus:outline-none focus:border-primary transition-colors duration-500 disabled:opacity-50"
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
                  disabled={submitting}
                  className="w-full bg-transparent border-b border-border py-4 text-foreground font-body text-base placeholder:text-text-dim/50 focus:outline-none focus:border-primary transition-colors duration-500 resize-none disabled:opacity-50"
                />
              </div>
              <div className="pt-4">
                <MagneticButton
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide"
                >
                  {submitting ? "Sending…" : "Send Message"}
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
