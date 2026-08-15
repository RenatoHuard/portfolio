import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../components/admin/AdminLayout";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const COLORS = ["signal", "violet", "amber"];

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function emptySlots() {
  return Array.from({ length: 8 }, (_, i) => ({
    position: i + 1,
    dbId: null,
    existingPath: null,
    caption: "",
    newFile: null,
    previewUrl: null,
    markedForDelete: false,
  }));
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full border border-line bg-surface px-4 py-2.5 text-sm text-text focus:border-signal focus:outline-none";

export default function ProjectEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    tag: "",
    status: "",
    summary: "",
    description: "",
    stack: "",
    color: "signal",
    link_demo: "",
    link_repo: "",
    display_order: 0,
  });
  const [slots, setSlots] = useState(emptySlots());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const slugTouched = useRef(false);

  // Load existing project
  useEffect(() => {
    if (isNew) return;
    async function load() {
      const { data: proj, error: err } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (err || !proj) { navigate("/admin/projetos"); return; }

      slugTouched.current = true;
      setForm({
        title: proj.title,
        slug: proj.slug,
        tag: proj.tag,
        status: proj.status,
        summary: proj.summary,
        description: (proj.description ?? []).join("\n\n"),
        stack: (proj.stack ?? []).join("\n"),
        color: proj.color ?? "signal",
        link_demo: proj.link_demo ?? "",
        link_repo: proj.link_repo ?? "",
        display_order: proj.display_order ?? 0,
      });

      const { data: shots } = await supabase
        .from("project_screenshots")
        .select("*")
        .eq("project_id", id)
        .order("position");

      if (shots) {
        setSlots((prev) =>
          prev.map((slot) => {
            const match = shots.find((s) => s.position === slot.position);
            if (!match) return slot;
            const previewUrl = match.storage_path
              ? `${SUPABASE_URL}/storage/v1/object/public/screenshots/${match.storage_path}`
              : null;
            return {
              ...slot,
              dbId: match.id,
              existingPath: match.storage_path,
              caption: match.caption,
              previewUrl,
            };
          })
        );
      }
    }
    load();
  }, [id, isNew, navigate]);

  function setField(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "title" && !slugTouched.current) {
        next.slug = toSlug(value);
      }
      return next;
    });
  }

  function updateSlot(position, patch) {
    setSlots((prev) => prev.map((s) => (s.position === position ? { ...s, ...patch } : s)));
  }

  function handleFileSelect(position, file) {
    if (!file) return;
    setSlots((prev) =>
      prev.map((s) => {
        if (s.position !== position) return s;
        if (s.previewUrl && !s.existingPath) URL.revokeObjectURL(s.previewUrl);
        return { ...s, newFile: file, previewUrl: URL.createObjectURL(file), markedForDelete: false };
      })
    );
  }

  function clearSlot(position) {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.position !== position) return s;
        if (s.previewUrl && !s.existingPath) URL.revokeObjectURL(s.previewUrl);
        return { ...s, newFile: null, previewUrl: null, markedForDelete: !!s.existingPath };
      })
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      tag: form.tag.trim(),
      status: form.status.trim(),
      summary: form.summary.trim(),
      description: form.description
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
      stack: form.stack
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean),
      color: form.color,
      link_demo: form.link_demo.trim() || null,
      link_repo: form.link_repo.trim() || null,
      display_order: Number(form.display_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let projectId = id;

    if (isNew) {
      const { data, error: err } = await supabase
        .from("projects")
        .insert(payload)
        .select("id")
        .single();
      if (err) { setError(err.message); setSaving(false); return; }
      projectId = data.id;
    } else {
      const { error: err } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", projectId);
      if (err) { setError(err.message); setSaving(false); return; }
    }

    // Screenshots
    for (const slot of slots) {
      const { position, dbId, existingPath, caption, newFile, markedForDelete } = slot;

      if (markedForDelete) {
        if (existingPath) await supabase.storage.from("screenshots").remove([existingPath]);
        if (dbId) await supabase.from("project_screenshots").delete().eq("id", dbId);
        continue;
      }

      if (newFile) {
        const ext = newFile.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const storagePath = `${payload.slug}/${position}.${ext}`;
        if (existingPath && existingPath !== storagePath) {
          await supabase.storage.from("screenshots").remove([existingPath]);
        }
        const { error: upErr } = await supabase.storage
          .from("screenshots")
          .upload(storagePath, newFile, { upsert: true });
        if (!upErr) {
          await supabase.from("project_screenshots").upsert(
            { ...(dbId ? { id: dbId } : {}), project_id: projectId, position, storage_path: storagePath, caption },
            { onConflict: "project_id,position" }
          );
        }
        continue;
      }

      // No new image — save caption if there's any content
      if (caption || existingPath) {
        await supabase.from("project_screenshots").upsert(
          { ...(dbId ? { id: dbId } : {}), project_id: projectId, position, storage_path: existingPath ?? null, caption },
          { onConflict: "project_id,position" }
        );
      }
    }

    setSaving(false);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
    if (isNew) navigate(`/admin/projetos/${projectId}/editar`);
  }

  const pageTitle = isNew ? "Novo projeto" : `Editar: ${form.title || "..."}`;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/admin/projetos"
          className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal"
        >
          ← Projetos
        </Link>
        <span className="text-muted/30">/</span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {isNew ? "Novo" : "Editar"}
        </span>
      </div>

      <h1 className="font-display text-2xl font-semibold text-text">{pageTitle}</h1>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        {/* ── INFORMAÇÕES BÁSICAS ── */}
        <section className="space-y-4 border border-line p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
            Informações básicas
          </p>

          <Field label="Título">
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Ex: Jes Sys"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (URL)">
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => { slugTouched.current = true; setField("slug", e.target.value); }}
                placeholder="ex: jes-sys"
                className={inputCls}
              />
            </Field>
            <Field label="Ordem de exibição">
              <input
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setField("display_order", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Tag">
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setField("tag", e.target.value)}
                placeholder="SYS.01"
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <input
                type="text"
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
                placeholder="Em produção"
                className={inputCls}
              />
            </Field>
            <Field label="Cor do destaque">
              <select
                value={form.color}
                onChange={(e) => setField("color", e.target.value)}
                className={inputCls}
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Resumo (1-2 frases para o card)">
            <textarea
              required
              rows={2}
              value={form.summary}
              onChange={(e) => setField("summary", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Descrição completa (separe parágrafos com linha em branco)">
            <textarea
              rows={8}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${inputCls} resize-y`}
            />
          </Field>

          <Field label="Stack (uma tecnologia por linha)">
            <textarea
              rows={4}
              value={form.stack}
              onChange={(e) => setField("stack", e.target.value)}
              placeholder={"React\nSupabase\nNode.js"}
              className={`${inputCls} resize-none font-mono text-xs`}
            />
          </Field>
        </section>

        {/* ── LINKS ── */}
        <section className="space-y-4 border border-line p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Links</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Demo / Site ao vivo">
              <input
                type="url"
                value={form.link_demo}
                onChange={(e) => setField("link_demo", e.target.value)}
                placeholder="https://..."
                className={inputCls}
              />
            </Field>
            <Field label="Repositório (GitHub)">
              <input
                type="url"
                value={form.link_repo}
                onChange={(e) => setField("link_repo", e.target.value)}
                placeholder="https://github.com/..."
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        {/* ── SCREENSHOTS ── */}
        <section className="space-y-4 border border-line p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
            Screenshots (8 slots)
          </p>
          <p className="text-[11px] text-muted">
            Bucket Supabase Storage: <code className="text-signal">screenshots</code> — public.
            As imagens ficam em <code className="text-signal">{"{slug}/{posição}.{ext}"}</code>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {slots.map((slot) => (
              <ScreenshotSlot
                key={slot.position}
                slot={slot}
                onFileSelect={handleFileSelect}
                onCaptionChange={(pos, val) => updateSlot(pos, { caption: val })}
                onClear={clearSlot}
              />
            ))}
          </div>
        </section>

        {/* ── ACTIONS ── */}
        {error && (
          <p className="border border-red-400/30 bg-red-400/5 px-4 py-3 font-mono text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="border border-signal bg-signal px-8 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar projeto"}
          </button>
          {done && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-signal">
              ✓ Salvo com sucesso
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}

function ScreenshotSlot({ slot, onFileSelect, onCaptionChange, onClear }) {
  const inputRef = useRef(null);
  const { position, previewUrl, caption, markedForDelete } = slot;
  const label = `SCR.${String(position).padStart(2, "0")}`;

  return (
    <div className="border border-line p-4 space-y-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>

      {/* Preview */}
      <div
        className="relative overflow-hidden bg-surface"
        style={{ aspectRatio: "16 / 9" }}
      >
        {previewUrl && !markedForDelete ? (
          <img src={previewUrl} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="hud-grid flex h-full items-center justify-center">
            <span className="font-mono text-[10px] text-line">
              {markedForDelete ? "Removida" : "Sem imagem"}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFileSelect(position, e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex-1 border border-line py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-signal hover:text-signal"
        >
          {previewUrl && !markedForDelete ? "Trocar" : "Enviar"}
        </button>
        {(previewUrl || slot.existingPath) && !markedForDelete && (
          <button
            type="button"
            onClick={() => onClear(position)}
            className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-red-400 hover:text-red-400"
          >
            ✕
          </button>
        )}
      </div>

      {/* Caption */}
      <textarea
        rows={2}
        value={caption}
        onChange={(e) => onCaptionChange(position, e.target.value)}
        placeholder="Descrição desta tela..."
        className="w-full resize-none border border-line bg-surface px-3 py-2 text-xs text-text focus:border-signal focus:outline-none"
      />
    </div>
  );
}
