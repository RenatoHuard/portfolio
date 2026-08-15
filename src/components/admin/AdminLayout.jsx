import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
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
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </div>
  );
}
