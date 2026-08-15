import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, tag, status, display_order")
      .order("display_order", { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Deletar "${title}"? Esta ação é irreversível.`)) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-text">Projetos</h1>
        <Link
          to="/admin/projetos/novo"
          className="border border-signal bg-signal px-4 py-2 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90"
        >
          + Novo projeto
        </Link>
      </div>

      {loading ? (
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          Carregando...
        </p>
      ) : (
        <div className="mt-8 divide-y divide-line border border-line">
          {projects.length === 0 && (
            <p className="px-6 py-10 text-center font-mono text-xs text-muted">
              Nenhum projeto cadastrado ainda.
            </p>
          )}
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {p.tag} · {p.status}
                </span>
                <p className="mt-0.5 font-display text-base font-semibold text-text">
                  {p.title}
                </p>
                <p className="font-mono text-[10px] text-muted/60">/{p.slug}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  to={`/projetos/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal"
                >
                  Ver ↗
                </Link>
                <Link
                  to={`/admin/projetos/${p.id}/editar`}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-red-400"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
