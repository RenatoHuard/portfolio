import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../components/admin/AdminLayout";
import { DEFAULTS } from "../../hooks/useSettings";

const FIELDS = [
  { key: "contact_email",      label: "E-mail de contato",               type: "email",  placeholder: DEFAULTS.contact_email },
  { key: "whatsapp_number",    label: "Número WhatsApp (só dígitos)",     type: "text",   placeholder: DEFAULTS.whatsapp_number },
  { key: "whatsapp_message",   label: "Mensagem pré-preenchida WhatsApp", type: "text",   placeholder: DEFAULTS.whatsapp_message },
  { key: "github_url",         label: "GitHub",                           type: "url",    placeholder: DEFAULTS.github_url },
  { key: "linkedin_url",       label: "LinkedIn",                         type: "url",    placeholder: DEFAULTS.linkedin_url },
  { key: "instagram_url",      label: "Instagram",                        type: "url",    placeholder: DEFAULTS.instagram_url },
];

export default function Settings() {
  const [form, setForm] = useState(Object.fromEntries(FIELDS.map((f) => [f.key, ""])));
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (!data) return;
        const loaded = {};
        data.forEach(({ key, value }) => { loaded[key] = value; });
        setForm((f) => ({ ...f, ...loaded }));
      });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const rows = FIELDS.map(({ key }) => ({ key, value: form[key] || DEFAULTS[key] }));
    const { error: err } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    setSaving(false);
    if (err) { setError(err.message); return; }
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-text">Configurações do site</h1>
      <p className="mt-1 text-sm text-muted">
        Dados de contato e redes sociais exibidos no rodapé e no botão WhatsApp.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-5 border border-line p-6">
        {FIELDS.map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              {label}
            </label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="mt-1 w-full border border-line bg-surface px-4 py-2.5 text-sm text-text placeholder:text-muted/40 focus:border-signal focus:outline-none"
            />
          </div>
        ))}

        {error && (
          <p className="font-mono text-[11px] text-red-400">{error}</p>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="border border-signal bg-signal px-8 py-3 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          {done && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-signal">
              ✓ Salvo
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
