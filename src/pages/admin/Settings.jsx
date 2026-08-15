import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../components/admin/AdminLayout";
import { DEFAULTS } from "../../hooks/useSettings";

const FIELDS = [
  { key: "contact_email",    label: "E-mail de contato",               type: "email", placeholder: DEFAULTS.contact_email },
  { key: "whatsapp_number",  label: "Número WhatsApp (só dígitos)",     type: "text",  placeholder: DEFAULTS.whatsapp_number },
  { key: "whatsapp_message", label: "Mensagem pré-preenchida WhatsApp", type: "text",  placeholder: DEFAULTS.whatsapp_message },
  { key: "github_url",       label: "GitHub",                           type: "url",   placeholder: DEFAULTS.github_url },
  { key: "linkedin_url",     label: "LinkedIn",                         type: "url",   placeholder: DEFAULTS.linkedin_url },
  { key: "instagram_url",    label: "Instagram",                        type: "url",   placeholder: DEFAULTS.instagram_url },
];

const APK_BUCKET = "releases";
const APK_PATH   = "android/crushdex-latest.apk";

export default function Settings() {
  const [form, setForm]     = useState(Object.fromEntries(FIELDS.map((f) => [f.key, ""])));
  const [saving, setSaving] = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState(null);

  // APK
  const [apkUrl, setApkUrl]         = useState("");
  const [apkUrlInput, setApkUrlInput] = useState("");
  const [uploading, setUploading]   = useState(false);
  const [apkError, setApkError]     = useState(null);
  const [apkDone, setApkDone]       = useState(false);
  const fileRef = useRef(null);

  // Foto de perfil
  const [photoUrl, setPhotoUrl]     = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [photoDone, setPhotoDone]   = useState(false);
  const photoRef = useRef(null);

  // Logo da marca
  const [logoUrl, setLogoUrl]       = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError]   = useState(null);
  const [logoDone, setLogoDone]     = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (!data) return;
        const loaded = {};
        data.forEach(({ key, value }) => { loaded[key] = value; });
        setForm((f) => ({ ...f, ...loaded }));
        const url = loaded.crushdex_apk_url || "";
        setApkUrl(url);
        setApkUrlInput(url);
        setPhotoUrl(loaded.profile_photo_url || "");
        setLogoUrl(loaded.brand_logo_url || "");
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

  async function saveSetting(key, value) {
    await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
  }

  // ── APK ──────────────────────────────────────────────────────
  async function handleApkFile(file) {
    if (!file) return;
    setUploading(true);
    setApkError(null);
    const { error: upErr } = await supabase.storage
      .from(APK_BUCKET)
      .upload(APK_PATH, file, { upsert: true, contentType: "application/vnd.android.package-archive" });
    if (upErr) { setApkError(upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from(APK_BUCKET).getPublicUrl(APK_PATH);
    await saveSetting("crushdex_apk_url", data.publicUrl);
    setApkUrl(data.publicUrl);
    setApkUrlInput(data.publicUrl);
    setUploading(false);
    setApkDone(true);
    setTimeout(() => setApkDone(false), 2500);
  }

  async function handleApkUrlSave() {
    const url = apkUrlInput.trim();
    if (!url) return;
    setApkError(null);
    await saveSetting("crushdex_apk_url", url);
    setApkUrl(url);
    setApkDone(true);
    setTimeout(() => setApkDone(false), 2500);
  }

  // ── MÍDIA (foto + logo) ───────────────────────────────────────
  async function handleMediaUpload(file, storagePath, settingKey, setUrl, setErr, setDone, setLoading) {
    if (!file) return;
    setLoading(true);
    setErr(null);
    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(storagePath, file, { upsert: true, contentType: file.type });
    if (upErr) { setErr(upErr.message); setLoading(false); return; }
    const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
    // bust cache with timestamp query param
    const fresh = `${data.publicUrl}?v=${Date.now()}`;
    await saveSetting(settingKey, fresh);
    setUrl(fresh);
    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-text">Configurações do site</h1>
      <p className="mt-1 text-sm text-muted">
        Dados de contato, redes sociais e mídias exibidas no site.
      </p>

      {/* ── CONTATO + REDES ── */}
      <form onSubmit={handleSave} className="mt-8 space-y-5 border border-line p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Contato e Redes</p>
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
        {error && <p className="font-mono text-[11px] text-red-400">{error}</p>}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="border border-signal bg-signal px-8 py-3 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          {done && <span className="font-mono text-[11px] uppercase tracking-widest text-signal">✓ Salvo</span>}
        </div>
      </form>

      {/* ── FOTO DE PERFIL + LOGO ── */}
      <div className="mt-10 border border-line p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Mídias do site</p>
        <p className="mt-1 text-sm text-muted">
          Foto exibida na seção "Quem sou" e logo no rodapé.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Foto de perfil */}
          <div className="border border-line p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Foto de perfil</p>
            <p className="mt-1 text-xs text-muted/70">JPG ou PNG · Proporção 3:4 recomendada</p>
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Foto de perfil"
                className="mt-3 h-28 w-auto border border-line object-cover"
              />
            )}
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleMediaUpload(
                  e.target.files?.[0], "profile.jpg",
                  "profile_photo_url",
                  setPhotoUrl, setPhotoError, setPhotoDone, setPhotoUploading
                )
              }
            />
            <button
              type="button"
              disabled={photoUploading}
              onClick={() => photoRef.current?.click()}
              className="mt-3 w-full border border-line py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:border-signal hover:text-signal disabled:opacity-50"
            >
              {photoUploading ? "Enviando..." : photoUrl ? "Substituir foto" : "Selecionar foto"}
            </button>
            {photoError && <p className="mt-2 font-mono text-[11px] text-red-400">{photoError}</p>}
            {photoDone  && <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-signal">✓ Foto atualizada</p>}
          </div>

          {/* Logo da marca */}
          <div className="border border-line p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Logo da marca</p>
            <p className="mt-1 text-xs text-muted/70">PNG com fundo transparente recomendado</p>
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo"
                className="mt-3 h-12 w-auto"
              />
            )}
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleMediaUpload(
                  e.target.files?.[0], "logo.png",
                  "brand_logo_url",
                  setLogoUrl, setLogoError, setLogoDone, setLogoUploading
                )
              }
            />
            <button
              type="button"
              disabled={logoUploading}
              onClick={() => logoRef.current?.click()}
              className="mt-3 w-full border border-line py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:border-signal hover:text-signal disabled:opacity-50"
            >
              {logoUploading ? "Enviando..." : logoUrl ? "Substituir logo" : "Selecionar logo"}
            </button>
            {logoError && <p className="mt-2 font-mono text-[11px] text-red-400">{logoError}</p>}
            {logoDone  && <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-signal">✓ Logo atualizado</p>}
          </div>
        </div>
      </div>

      {/* ── CRUSHDEX APK ── */}
      <div className="mt-10 border border-line p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">CrushDex APK</p>
        <p className="mt-1 text-sm text-muted">
          Escolha como publicar o APK: suba o arquivo diretamente ou cole a URL de download.
        </p>

        {/* Status atual */}
        <div className="mt-4 font-mono text-xs">
          <span className="text-muted uppercase tracking-widest">Status: </span>
          {apkUrl ? (
            <>
              <span className="text-signal">✓ APK configurado — </span>
              <a
                href={apkUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-muted hover:text-signal"
              >
                Testar link ↗
              </a>
            </>
          ) : (
            <span className="text-muted/50">Nenhum APK configurado</span>
          )}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Opção A */}
          <div className="border border-line p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Opção A — Upload do arquivo
            </p>
            <p className="mt-1 text-xs text-muted/70">
              Baixe o <code>.apk</code> do Expo e suba aqui. Vai para o Supabase Storage e o link é atualizado automaticamente.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".apk,application/vnd.android.package-archive"
              className="hidden"
              onChange={(e) => handleApkFile(e.target.files?.[0])}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="mt-4 w-full border border-line py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:border-signal hover:text-signal disabled:opacity-50"
            >
              {uploading ? "Enviando..." : "Selecionar .apk"}
            </button>
          </div>

          {/* Opção B */}
          <div className="border border-line p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Opção B — URL externa
            </p>
            <p className="mt-1 text-xs text-muted/70">
              No expo.dev: <strong>Builds → clique no build → botão Download → botão direito → Copiar endereço do link</strong>. Não use a URL da barra do navegador.
            </p>
            <input
              type="url"
              value={apkUrlInput}
              onChange={(e) => setApkUrlInput(e.target.value)}
              placeholder="https://expo.dev/artifacts/eas/..."
              className="mt-4 w-full border border-line bg-surface px-3 py-2 text-xs text-text placeholder:text-muted/40 focus:border-signal focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApkUrlSave}
              disabled={!apkUrlInput.trim() || apkUrlInput === apkUrl}
              className="mt-2 w-full border border-line py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:border-signal hover:text-signal disabled:opacity-30"
            >
              Salvar URL
            </button>
          </div>
        </div>

        {apkError && <p className="mt-4 font-mono text-[11px] text-red-400">{apkError}</p>}
        {apkDone  && <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-signal">✓ APK atualizado</p>}
      </div>
    </AdminLayout>
  );
}
