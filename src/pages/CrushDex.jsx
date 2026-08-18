import { crushdex } from "../data/projects";
import { useSettings } from "../hooks/useSettings";

export default function CrushDex() {
  const { crushdex_apk_url, crushdex_web_url } = useSettings();
  const apkUrl = crushdex_apk_url || null;
  const webUrl = crushdex_web_url || null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="border border-amber px-2 py-0.5 text-amber">{crushdex.tag}</span>
        <span>{crushdex.status}</span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-semibold text-text md:text-5xl">
        {crushdex.title}
      </h1>

      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
        {crushdex.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-violet">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {crushdex.stack.map((tech) => (
            <li key={tech} className="border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-text">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {webUrl && (
        <div className="mt-12 hud-corners border border-violet bg-surface p-8">
          <div className="corner-tl" />
          <div className="corner-br" />
          <p className="font-mono text-xs uppercase tracking-widest text-violet">Versão Web</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text">
            Abrir no navegador
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Experimente o CrushDex direto pelo navegador, sem precisar instalar nada.
          </p>
          <a
            href={webUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-violet bg-violet px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
          >
            Abrir Web App <span aria-hidden>↗</span>
          </a>
        </div>
      )}

      <div className="mt-12 hud-corners border border-line bg-surface p-8">
        <div className="corner-tl" />
        <div className="corner-br" />
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Download</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-text">
          Baixar CrushDex (Android)
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          O link sempre aponta para a versão mais recente publicada.
        </p>

        {apkUrl ? (
          <>
            <a
              href={apkUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
            >
              Baixar APK <span aria-hidden>↓</span>
            </a>
            <p className="mt-3 font-mono text-[11px] text-muted">
              Requer permissão para instalar apps de fontes desconhecidas no Android.
            </p>
          </>
        ) : (
          <div className="mt-6">
            <span className="inline-block cursor-not-allowed border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted/50">
              Em breve ↓
            </span>
            <p className="mt-3 font-mono text-[11px] text-muted">
              O APK ainda não foi publicado. Volte em breve.
            </p>
          </div>
        )}
      </div>

      {crushdex.repo && (
        <div className="mt-6">
          <a
            href={crushdex.repo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-signal"
          >
            Ver repositório ↗
          </a>
        </div>
      )}
    </div>
  );
}
