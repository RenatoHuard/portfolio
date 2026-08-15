import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProject } from "../hooks/useProject";
import { useProjects } from "../hooks/useProjects";
import ProjectGallery from "../components/ProjectGallery";

function SideNav({ project, direction }) {
  const isLeft = direction === "left";
  return (
    <Link
      to={`/projetos/${project.slug}`}
      className={`
        fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3
        xl:flex
        ${isLeft ? "left-5" : "right-5"}
      `}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="border border-line bg-surface/90 px-3 py-5 font-mono text-xl text-muted backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
      >
        {isLeft ? "←" : "→"}
      </motion.div>
      <span className="max-w-[3.5rem] text-center font-mono text-[9px] uppercase leading-tight tracking-widest text-muted/50">
        {project.title}
      </span>
    </Link>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, screenshots, loading, notFound } = useProject(slug);
  const { projects } = useProjects();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="h-8 w-40 animate-pulse bg-surface" />
        <div className="mt-8 h-12 w-3/4 animate-pulse bg-surface" />
        <div className="mt-10 aspect-video animate-pulse bg-surface" />
      </div>
    );
  }

  if (notFound) return <Navigate to="/portfolio" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx !== -1 && idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <>
      {prev && <SideNav project={prev} direction="left" />}
      {next && <SideNav project={next} direction="right" />}

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/portfolio"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-signal"
          >
            ← Voltar ao portfolio
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="border border-signal px-2 py-0.5 text-signal">{project.tag}</span>
            <span>{project.status}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-8 font-display text-4xl font-semibold text-text md:text-5xl">
          {project.title}
        </h1>

        {/* Gallery */}
        <ProjectGallery screenshots={screenshots} tag={project.tag} />

        {/* Description */}
        <div className="mt-10 space-y-4 text-base leading-relaxed text-muted">
          {(project.description ?? []).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-violet">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {(project.stack ?? []).map((tech) => (
              <li
                key={tech}
                className="border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-text"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        {(project.link_repo || project.link_demo) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.link_demo && (
              <a
                href={project.link_demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
              >
                Ver site ao vivo <span aria-hidden>↗</span>
              </a>
            )}
            {project.link_repo && (
              <a
                href={project.link_repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-bg"
              >
                Ver repositório <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}

        {/* Navegação mobile */}
        <div className="mt-16 flex justify-between gap-4 border-t border-line pt-8 xl:hidden">
          {prev ? (
            <Link to={`/projetos/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-signal">
                ← Projeto anterior
              </span>
              <span className="font-display text-base font-semibold text-text group-hover:text-signal">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link to={`/projetos/${next.slug}`} className="group flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-signal">
                Próximo projeto →
              </span>
              <span className="font-display text-base font-semibold text-text group-hover:text-signal">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}
