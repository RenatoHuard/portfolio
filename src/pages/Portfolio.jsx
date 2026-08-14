import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.PROJECTS // Portfolio</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-text">
        Sistemas que construí, do banco de dados à interface.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Cada card resume um sistema. Clique em "Saiba mais" para ver arquitetura,
        stack e o problema que o projeto resolve.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
