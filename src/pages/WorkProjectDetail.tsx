import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";
import SectionDivider from "@/components/SectionDivider";
import { getProjectBySlug } from "@/lib/projects";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const PdfViewer = ({ pdfUrl, title }: { pdfUrl: string; title: string }) => {
  const [pageCount, setPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(() =>
    typeof window !== "undefined" ? Math.min(window.innerWidth - 96, 960) : 960,
  );

  useEffect(() => {
    const updateWidth = () => {
      setPageWidth(Math.min(window.innerWidth - 96, 960));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Document
      file={pdfUrl}
      loading={
        <div className="flex min-h-[36rem] items-center justify-center px-6 text-sm font-detail text-text-subtle">
          Loading PDF...
        </div>
      }
      error={
        <div className="flex min-h-[36rem] items-center justify-center px-6 text-sm font-detail text-text-subtle">
          Unable to display the PDF. Use the open button above to view it in a
          new tab.
        </div>
      }
      onLoadSuccess={({ numPages }) => setPageCount(numPages)}
      className="bg-background"
    >
      <div className="space-y-6 md:space-y-8 p-3 md:p-4">
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={`${title}-page-${index + 1}`}
            className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-white shadow-sm"
          >
            <Page
              pageNumber={index + 1}
              width={pageWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </div>
        ))}
      </div>
    </Document>
  );
};

const WorkProjectDetail = () => {
  const shouldReduceMotion = useReducedMotion();
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const openPdfUrl = project?.pdfUrl ?? project?.pdfEmbedUrl;

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
            {openPdfUrl ? (
              <motion.section
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-[2rem] border border-border/70 bg-card/80 backdrop-blur-sm p-4 md:p-6"
              >
                <h2 className="px-2 text-xl md:text-2xl font-display font-bold text-foreground">
                  Project PDF
                </h2>
                <p className="mt-1 px-2 text-sm font-detail text-text-subtle">
                  Scroll through the paper here while reading the project notes.
                </p>

                <div className="mt-4 max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-border/70 bg-background/80">
                  {project.pdfEmbedUrl ? (
                    <iframe
                      src={project.pdfEmbedUrl}
                      title={`${project.title} PDF`}
                      className="h-[80vh] min-h-[36rem] w-full"
                      allow="autoplay"
                    />
                  ) : project.pdfUrl ? (
                    <PdfViewer pdfUrl={project.pdfUrl} title={project.title} />
                  ) : null}
                </div>
              </motion.section>
            ) : (
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.65)]"
              >
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="flex min-h-[22rem] items-center justify-center bg-gradient-to-br from-primary/15 via-card to-primary/5 p-8 text-center">
                    <p className="text-sm font-detail text-text-subtle">
                      No cover image for this achievement.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

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

                {openPdfUrl ? (
                  <div className="mt-6">
                    <MagneticButton
                      type="button"
                      onClick={() =>
                        window.open(openPdfUrl, "_blank", "noopener,noreferrer")
                      }
                      className="px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors"
                    >
                      {project.pdfLabel ?? "View project PDF"}
                    </MagneticButton>
                  </div>
                ) : null}

                {project.projectUrl ? (
                  <div className="mt-4">
                    <MagneticButton
                      type="button"
                      onClick={() =>
                        window.open(
                          project.projectUrl,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      className="px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors"
                    >
                      {project.projectUrlLabel ?? "Visit project website"}
                    </MagneticButton>
                  </div>
                ) : null}
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
