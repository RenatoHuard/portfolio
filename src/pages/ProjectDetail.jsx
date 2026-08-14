import { Link, useParams, Navigate } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link to="/portfolio" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-signal">
        ← Voltar ao portfolio
      </Link>

      <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="border border-signal px-2 py-0.5 text-signal">{project.tag}</span>
        <span>{project.status}</span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-semibold text-text md:text-5xl">
        {project.title}
      </h1>

      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-violet">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-text">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.links?.repo && (
        <div className="mt-10">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-bg"
          >
            Ver repositório <span aria-hidden>↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
