import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import profileImg from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { socialLinks } from "@/lib/contact";
import { sanitizeUrl } from "@/lib/security";

const Index = () => {
  return (
    <PageTransition>
      <div className="relative noise-overlay overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-[0.12] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">

          {/* Floating organic blob */}
          <div
            className="absolute top-1/4 right-[10%] w-[400px] h-[400px] organic-blob opacity-[0.04]"
            style={{
              background:
                "linear-gradient(135deg, hsl(32 58% 77%), hsl(20 48% 45%))",
            }}
          />

          <div className="relative z-10 flex flex-1 flex-col w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 min-h-0">
            <div className="flex-1 flex items-center pt-28 pb-8 lg:py-0 min-h-0">
              <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end w-full">
                <div className="pt-4 lg:pt-0">
                  <div className="mb-8 h-6" aria-hidden="true" />

                  <RevealText>
                    <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-display font-bold leading-[0.95] tracking-tight">
                      Toyeshh Medikonda
                    </h1>
                  </RevealText>

                  <p className="mt-3 text-sm md:text-base font-detail text-text-subtle">
                    Turing Scholar (CS Honors) + Math @ UT Austin
                  </p>

                  <div className="mt-8 max-w-2xl text-text-subtle font-detail text-base leading-relaxed">
                    <p className="font-medium text-foreground/90 lowercase">
                      Quick overview of me:
                    </p>
                    <ul className="mt-3 space-y-1.5 list-disc pl-5">
                      <li>
                        worked on AI college mapping at{" "}
                        <span className="rounded-sm border border-primary/35 bg-primary/20 px-1 text-foreground">
                          Ultra (YC W24)
                        </span>
                        ; scaled 10k+ users
                      </li>
                      <li>
                        researched at{" "}
                        <span className="rounded-sm border border-primary/30 bg-primary/15 px-1 text-foreground">
                          Non-Trivial
                        </span>{" "}
                        on quantum machine learning for crop-disease detection
                      </li>
                      <li>
                        co-founded{" "}
                        <span className="rounded-sm border border-accent/35 bg-accent/20 px-1 text-foreground">
                          WearItForward
                        </span>
                        ; a humanitarian nonprofit raising $200k+ in clothing
                        donations and featured on FOX News
                      </li>
                      <li>
                        was a finalist in{" "}
                        <span className="rounded-sm border border-secondary-foreground/30 bg-secondary/80 px-1 text-foreground">
                          M3 Math Modeling
                        </span>
                        {""}; won $5,500, and presented at Jane Street
                      </li>
                      <li>
                        researched at{" "}
                        <span className="rounded-sm border border-primary/40 bg-primary/25 px-1 text-foreground">
                          UTD
                        </span>
                        on NLP frameworks for AI art critiques
                      </li>
                      <li>
                        worked on accessible competition math at{" "}
                        <span className="rounded-sm border border-primary/25 bg-muted px-1 text-foreground">
                          ExcelAcademe
                        </span>
                        ; sponsored by Jane Street & Wolfram
                      </li>
                      <li>
                        researched at{" "}
                        <span className="rounded-sm border border-secondary-foreground/25 bg-secondary px-1 text-foreground">
                          NYAS
                        </span>{" "}
                        on biodegradable air filters; invited to the JCSVEI
                        alumni community by the U.S. Dept. of State
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Link to="/work">
                      <MagneticButton className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                        View Work
                      </MagneticButton>
                    </Link>
                    <Link to="/contact">
                      <MagneticButton className="px-8 py-4 rounded-lg border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors">
                        Get in Touch
                      </MagneticButton>
                    </Link>
                  </div>
                </div>

                {/* Profile image - asymmetric placement */}
                <div className="hidden lg:block relative">
                  <div className="w-[320px] h-[400px] rounded-[1.5rem] overflow-hidden relative">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-12 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <SectionDivider />
          <div className="mt-8 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center">
            <span className="text-sm font-detail text-text-dim">
              © 2026 Toyeshh Medikonda.
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={
                    sanitizeUrl(s.href, {
                      allowedProtocols: ["http:", "https:"],
                      allowRelative: false,
                    }) ?? undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-detail text-text-dim hover:text-primary transition-colors"
                >
                  {s.label === "GitHub" ? (
                    <Github className="h-4 w-4" aria-hidden="true" />
                  ) : null}
                  {s.label === "LinkedIn" ? (
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  ) : null}
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
