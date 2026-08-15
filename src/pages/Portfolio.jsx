import ProjectCard from "../components/ProjectCard";
import ScrollTyping from "../components/ScrollTyping";
import { useProjects } from "../hooks/useProjects";

export default function Portfolio() {
  const { projects, loading } = useProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.PROJECTS // Portfolio</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-text">
        <ScrollTyping text="Sistemas que construí, do banco de dados à interface." speed={24} />
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Cada card resume um sistema. Clique em "Saiba mais" para ver arquitetura,
        stack e o problema que o projeto resolve.
      </p>

      {loading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse border border-line bg-surface" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
