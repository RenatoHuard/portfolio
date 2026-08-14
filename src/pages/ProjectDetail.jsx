import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
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
      <span
        className={`
          max-w-[3.5rem] font-mono text-[9px] uppercase leading-tight tracking-widest text-muted/50
          text-center
        `}
      >
        {project.title}
      </span>
    </Link>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);

  if (idx === -1) return <Navigate to="/portfolio" replace />;

  const project = projects[idx];
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <>
      {/* Setas laterais fixas — desktop */}
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
        <ProjectGallery screenshots={project.screenshots ?? []} tag={project.tag} />

        {/* Description */}
        <div className="mt-10 space-y-4 text-base leading-relaxed text-muted">
          {project.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-violet">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
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
        {(project.links?.repo || project.links?.demo) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
              >
                Ver site ao vivo <span aria-hidden>↗</span>
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-bg"
              >
                Ver repositório <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}

        {/* Navegação mobile — aparece apenas em telas sem as setas laterais */}
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
