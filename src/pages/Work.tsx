import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import {
  getProjectsByFilter,
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/lib/projects";

const filters = projectFilters;
const MIN_LOOP_SEGMENT_ITEMS = 6;
const TOP_ROW_BASE_DURATION = 44;
const BOTTOM_ROW_BASE_DURATION = 48;
const HOVER_SLOWDOWN_MULTIPLIER = 2.1;
const HIDDEN_WORK_SLUGS = new Set([
  "bpa-nlc-competitor",
  "texas-deca-icdc-alternate",
]);

const buildLoopingRow = (items: Project[]) => {
  if (items.length === 0) {
    return [];
  }

  const segment =
    items.length >= MIN_LOOP_SEGMENT_ITEMS
      ? items
      : Array.from(
          { length: Math.ceil(MIN_LOOP_SEGMENT_ITEMS / items.length) },
          () => items,
        ).flat();

  return [...segment, ...segment, ...segment];
};

const ProjectTile = ({
  project,
  overview,
  rowIndex,
  index,
  onOverviewHoverChange,
}: {
  project: Project;
  overview: boolean;
  rowIndex?: number;
  index: number;
  onOverviewHoverChange?: (isHovering: boolean) => void;
}) => {
  const card = (
    <div className="group relative w-[16.5rem] sm:w-[18.5rem] md:w-[20.5rem] lg:w-[23.5rem] rounded-[1.25rem] overflow-hidden border border-border/70 bg-card/80 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-colors duration-300 hover:border-border/90">
      <div className="relative aspect-[16/9] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={1400}
            height={788}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/15 via-card to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-background/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/25 to-transparent" />
      </div>

      <div className="p-3.5 md:p-4 border-t border-border/60 bg-background/75 backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] md:text-xs font-detail text-text-dim tracking-[0.2em] uppercase block">
              {project.category} · {project.year}
            </span>
            <h3 className="mt-1 text-base md:text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/80 text-sm text-primary transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </div>
        <p className="mt-1.5 text-[11px] md:text-xs font-detail text-text-subtle leading-relaxed max-w-2xl line-clamp-2">
          {project.desc}
        </p>
      </div>
    </div>
  );

  if (overview) {
    return (
      <motion.article
        key={`${project.title}-${rowIndex}-${index}`}
        className="shrink-0 will-change-transform"
        whileHover={{ y: -6, scale: 1.01 }}
        onHoverStart={() => onOverviewHoverChange?.(true)}
        onHoverEnd={() => onOverviewHoverChange?.(false)}
      >
        <Link to={`/work/${project.slug}`} className="block">
          {card}
        </Link>
      </motion.article>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className="group block h-full">
      {card}
    </Link>
  );
};

const Work = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("everything");
  const [overviewNonce, setOverviewNonce] = useState(0);
  const [hoveredOverviewRow, setHoveredOverviewRow] = useState<number | null>(
    null,
  );

  const visibleProjects = useMemo(
    () =>
      getProjectsByFilter(activeFilter).filter(
        (project) => !HIDDEN_WORK_SLUGS.has(project.slug),
      ),
    [activeFilter],
  );

  const baseProjects = useMemo(
    () => projects.filter((project) => !HIDDEN_WORK_SLUGS.has(project.slug)),
    [],
  );

  const topRowProjects = useMemo(() => {
    const evenItems = baseProjects.filter((_, index) => index % 2 === 0);
    const source = evenItems.length > 0 ? evenItems : baseProjects;
    return buildLoopingRow(source);
  }, [baseProjects]);

  const bottomRowProjects = useMemo(() => {
    const oddItems = baseProjects.filter((_, index) => index % 2 === 1);
    const source = oddItems.length > 0 ? oddItems : baseProjects;
    return buildLoopingRow(source);
  }, [baseProjects]);

  const handleOverviewHoverChange = (rowIndex: number, isHovering: boolean) => {
    if (isHovering) {
      setHoveredOverviewRow(rowIndex);
      return;
    }

    setHoveredOverviewRow((prev) => (prev === rowIndex ? null : prev));
  };

  const handleFilterClick = (filter: ProjectFilter) => {
    if (filter === "everything") {
      setOverviewNonce((value) => value + 1);
    }

    setActiveFilter(filter);
  };

  return (
    <PageTransition>
      <div className="noise-overlay min-h-screen pt-28 md:pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto">
            <RevealText>
              <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                Portfolio
              </span>
            </RevealText>
            <RevealText delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
                Selected
                <br />
                <span className="text-gradient">Work</span>
              </h1>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-text-subtle font-detail text-base md:text-lg leading-relaxed"
            >
              A couple of the works that have shaped who I am. I’ve done a lot
              of different things, but here are some highlights.
            </motion.p>
          </div>

          <div className="mt-8 md:mt-10 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border/70 bg-card/70 p-2 backdrop-blur-sm">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterClick(filter)}
                    className={`rounded-lg px-4 py-2 text-sm font-detail tracking-wide capitalize transition-colors ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-text-subtle hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <SectionDivider />
          </div>

          <div className="mt-8 md:mt-10 relative left-1/2 right-1/2 w-screen -translate-x-1/2">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
              <div className="w-[34rem] h-[34rem] md:w-[48rem] md:h-[48rem] rounded-full bg-primary/6 blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              {activeFilter === "everything" ? (
                <motion.div
                  key={`everything-${overviewNonce}`}
                  className="relative overflow-hidden py-2 space-y-4 md:space-y-5 px-2 sm:px-4 md:px-6 lg:px-8"
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }
                  }
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  {[topRowProjects, bottomRowProjects].map(
                    (rowProjects, rowIndex) => (
                      <motion.div
                        key={rowIndex}
                        className="flex items-stretch gap-4 md:gap-5 w-max py-1"
                        initial={
                          shouldReduceMotion
                            ? undefined
                            : { x: rowIndex === 0 ? "0%" : "-33.333%" }
                        }
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                x:
                                  rowIndex === 0
                                    ? ["0%", "-33.333%"]
                                    : ["-33.333%", "0%"],
                              }
                        }
                        transition={
                          shouldReduceMotion
                            ? undefined
                            : {
                                duration:
                                  hoveredOverviewRow === rowIndex
                                    ? (rowIndex === 0
                                        ? TOP_ROW_BASE_DURATION
                                        : BOTTOM_ROW_BASE_DURATION) *
                                      HOVER_SLOWDOWN_MULTIPLIER
                                    : rowIndex === 0
                                      ? TOP_ROW_BASE_DURATION
                                      : BOTTOM_ROW_BASE_DURATION,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "linear",
                              }
                        }
                        style={{ willChange: "transform" }}
                      >
                        {rowProjects.map((project, index) => (
                          <ProjectTile
                            key={`${project.title}-${rowIndex}-${index}`}
                            project={project}
                            overview
                            rowIndex={rowIndex}
                            index={index}
                            onOverviewHoverChange={(isHovering) =>
                              handleOverviewHoverChange(rowIndex, isHovering)
                            }
                          />
                        ))}
                      </motion.div>
                    ),
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={activeFilter}
                  className="relative py-2 px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-auto overflow-y-hidden"
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }
                  }
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  style={{ willChange: "transform" }}
                >
                  <div className="flex w-max gap-4 md:gap-5 pr-2 snap-x snap-mandatory">
                    {visibleProjects.map((project, index) => (
                      <div key={project.slug} className="snap-start shrink-0">
                        <ProjectTile
                          project={project}
                          overview={false}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <MagneticButton className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide">
                Start a project
              </MagneticButton>
            </Link>
            <Link to="/about">
              <MagneticButton className="px-8 py-4 rounded-lg border border-border text-foreground font-body text-sm font-medium tracking-wide hover:border-primary/40 transition-colors">
                About me
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Work;
