import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const adminLinks = [
  { to: "/admin/projetos",       label: "Projetos" },
  { to: "/admin/configuracoes",  label: "Configurações" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <span className="font-display text-sm font-semibold text-text">
            <span className="text-signal">&gt;</span> renato.huard{" "}
            <span className="text-muted">/ admin</span>
          </span>
          <div className="flex items-center gap-5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal"
            >
              Ver site ↗
            </a>
            <button
              onClick={logout}
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-red-400"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Sub-nav */}
        <div className="mx-auto flex max-w-4xl gap-1 px-6 pb-0">
          {adminLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                "border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors " +
                (isActive
                  ? "border-signal text-signal"
                  : "border-transparent text-muted hover:text-signal")
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </div>
  );
}
