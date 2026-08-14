import { Link } from "react-router-dom";

const accents = {
  signal: "text-signal border-signal",
  violet: "text-violet border-violet",
  amber: "text-amber border-amber",
};

export default function ProjectCard({ project }) {
  const accent = accents[project.color] || accents.signal;

  return (
    <article className="hud-corners group flex h-full flex-col justify-between border border-line bg-surface p-6 transition-colors hover:border-signal/40">
      <div className="corner-tl" />
      <div className="corner-br" />

      <div>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className={`border px-2 py-0.5 ${accent}`}>{project.tag}</span>
          <span>{project.status}</span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold text-text">
          {project.title}
        </h3>

        {/* Descrição colapsada (clamp) para manter altura padrão do card */}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/projetos/${project.slug}`}
        className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:text-text"
      >
        Saiba mais <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
