import { Link } from "react-router-dom";
import TerminalLine from "../components/TerminalLine";
import { projects } from "../data/projects";

const stats = [
  { label: "Anos como dev / automação", value: "5+" },
  { label: "Anos em corporações (SP)", value: "9" },
  { label: "Sistemas em produção", value: "2" },
  { label: "Stack principal", value: "React / Node / Supabase" },
];

const skills = [
  {
    tag: "SKL.01",
    title: "Desenvolvimento Full-Stack",
    text: "Aplicações e sistemas de gestão com React no front-end, Node.js e Supabase (PostgreSQL) no back-end — do modelo de dados à interface.",
  },
  {
    tag: "SKL.02",
    title: "Automação de Processos",
    text: "Fluxos que eliminam trabalho manual: edge functions, integrações de pagamento (Mercado Pago) e videoconferência (WebRTC / Jitsi).",
  },
  {
    tag: "SKL.03",
    title: "Gestão de Tráfego Pago",
    text: "5 anos gerindo Google Ads e Meta Ads como lançador e co-produtor de produtos digitais — leio dado de aquisição tão bem quanto leio uma query.",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="hud-grid hud-scanline relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            SYS.BOOT // renato_huard.exe
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-text md:text-6xl">
            <TerminalLine text="Construo sistemas que resolvem problemas reais." speed={26} />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Desenvolvedor full-stack focado em React, Node.js e Supabase. Projeto e
            construo plataformas de gestão de ponta a ponta — do banco de dados à
            experiência do usuário.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="border border-signal bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
            >
              Ver Portfolio
            </Link>
            <a
              href="#sobre"
              className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal"
            >
              Quem sou eu
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-8">
              <p className="font-display text-2xl font-semibold text-signal md:text-3xl">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.PROFILE // Quem sou eu</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-text md:text-4xl">
            Perfil analítico, formado em Ciência da Computação, construído em cima da experiência.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
            Hoje meu foco é desenvolvimento full-stack: projeto e construo sistemas de
            gestão do zero, cuido da arquitetura de dados no Supabase e implemento
            automações que tiram tarefas repetitivas do caminho de quem usa o sistema.
            Isso vem de uma base pouco comum — 9 anos em multinacionais em São Paulo como
            analista, 4 anos como Cabo do Exército Brasileiro e 5 anos como gestor de
            tráfego pago, lançador e co-produtor de produtos digitais. Essa mistura é o
            que me faz pensar em produto e em dado de aquisição com a mesma naturalidade
            com que penso em schema de banco.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {skills.map((s) => (
              <div key={s.tag} className="bg-surface p-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-violet">
                  {s.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.PROJECTS</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-text md:text-4xl">
              Sistemas em produção e desenvolvimento.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:text-text"
          >
            Ver todos →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/projetos/${p.slug}`}
              className="hud-corners group border border-line bg-surface p-6 transition-colors hover:border-signal/40"
            >
              <div className="corner-tl" />
              <div className="corner-br" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {p.tag} · {p.status}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
