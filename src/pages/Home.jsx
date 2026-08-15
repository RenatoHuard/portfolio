import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import TerminalLine from "../components/TerminalLine";
import ScrollTyping from "../components/ScrollTyping";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import { useProjects } from "../hooks/useProjects";
import { supabase } from "../lib/supabase";

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

function useCountUp(target, duration = 1600, inView = false) {
  const [display, setDisplay] = useState(target);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const num = parseFloat(target);
    if (isNaN(num)) return;
    const suffix = target.slice(String(Math.floor(num)).length);
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(String(Math.round(eased * num)) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return display;
}

function StatCard({ label, value, inView, delay }) {
  const count = useCountUp(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface px-6 py-8"
    >
      <p className="font-display text-2xl font-semibold text-signal md:text-3xl">{count}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const { projects } = useProjects();

  // Hero parallax
  const heroMouseX = useMotionValue(0.5);
  const heroMouseY = useMotionValue(0.5);

  const gridX = useTransform(heroMouseX, [0, 1], ["-18px", "18px"]);
  const gridY = useTransform(heroMouseY, [0, 1], ["-12px", "12px"]);
  const textX = useTransform(heroMouseX, [0, 1], ["10px", "-10px"]);
  const textY = useTransform(heroMouseY, [0, 1], ["6px", "-6px"]);

  const sGridX = useSpring(gridX, { stiffness: 40, damping: 20 });
  const sGridY = useSpring(gridY, { stiffness: 40, damping: 20 });
  const sTextX = useSpring(textX, { stiffness: 60, damping: 25 });
  const sTextY = useSpring(textY, { stiffness: 60, damping: 25 });

  // Stats intersection
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-line hud-scanline"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          heroMouseX.set((e.clientX - r.left) / r.width);
          heroMouseY.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          heroMouseX.set(0.5);
          heroMouseY.set(0.5);
        }}
      >
        <motion.div
          className="absolute inset-[-5%] hud-grid pointer-events-none"
          style={{ x: sGridX, y: sGridY }}
        />
        <motion.div
          className="relative mx-auto max-w-6xl px-6 py-28 md:py-36"
          style={{ x: sTextX, y: sTextY }}
        >
          <motion.p
            className="font-mono text-xs uppercase tracking-widest text-signal"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            SYS.BOOT // renato_huard.exe
          </motion.p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-text md:text-6xl">
            <TerminalLine text="Construo sistemas que resolvem problemas reais." speed={26} />
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Desenvolvedor full-stack focado em React, Node.js e Supabase. Projeto e
            construo plataformas de gestão de ponta a ponta — do banco de dados à
            experiência do usuário.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section ref={statsRef} className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} inView={statsInView} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              SYS.PROFILE // Quem sou eu
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-text md:text-4xl">
              <ScrollTyping text="Perfil analítico, formado em Ciência da Computação, construído em cima da experiência." speed={22} />
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
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {skills.map((s, i) => (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-surface p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-violet">
                  {s.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.PROJECTS</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-text md:text-4xl">
                <ScrollTyping text="Sistemas em produção e desenvolvimento." speed={28} />
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="font-mono text-xs uppercase tracking-widest text-signal hover:text-text"
            >
              Ver todos →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <TiltCard>
                <Link
                  to={`/projetos/${p.slug}`}
                  className="hud-corners group block border border-line bg-surface p-6 transition-colors hover:border-signal/40"
                >
                  <div className="corner-tl" />
                  <div className="corner-br" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {p.tag} · {p.status}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-text">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <ContactSection />
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <section id="contato" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.CONTACT</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-text md:text-4xl">
            Vamos conversar.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Tem um projeto em mente, uma vaga para discutir ou só quer trocar uma ideia? Me
            manda uma mensagem.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* Links diretos */}
          <Reveal delay={0.1}>
            <ul className="space-y-5">
              {[
                { label: "E-mail", value: "renato.jhs@gmail.com", href: "mailto:renato.jhs@gmail.com" },
                { label: "GitHub", value: "github.com/RenatoHuard", href: "https://github.com/RenatoHuard" },
                { label: "LinkedIn", value: "linkedin.com/in/renatohuard", href: "https://linkedin.com/in/renatohuard" },
              ].map((link) => (
                <li key={link.label} className="border-b border-line pb-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {link.label}
                  </p>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm text-text transition-colors hover:text-signal"
                  >
                    {link.value} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Formulário */}
          <Reveal delay={0.18}>
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col items-start justify-center gap-3 border border-signal/30 bg-signal/5 p-8"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-signal">
                  MSG.SENT ✓
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  Mensagem recebida. Retorno em breve.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-xs uppercase tracking-widest text-muted underline underline-offset-4 hover:text-signal"
                >
                  Enviar outra
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
                  { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block font-mono text-[10px] uppercase tracking-widest text-muted"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      value={form[id]}
                      onChange={set(id)}
                      placeholder={placeholder}
                      className="mt-1 w-full border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/40 focus:border-signal focus:outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10px] uppercase tracking-widest text-muted"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Descreva seu projeto ou proposta..."
                    className="mt-1 w-full resize-none border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/40 focus:border-signal focus:outline-none"
                  />
                </div>
                {status === "error" && (
                  <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
                    Erro ao enviar. Tente novamente ou use o e-mail diretamente.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full border border-signal bg-signal py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
