import { useSettings } from "../hooks/useSettings";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact_email, whatsapp_number, github_url, linkedin_url, instagram_url, brand_logo_url } = useSettings();

  return (
    <footer id="contato" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              SYS.END // Contato
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-text">
              Vamos construir alguma coisa.
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted">
              Aberto a projetos de desenvolvimento, automação de processos e consultoria
              técnica. Resposta rápida por WhatsApp ou e-mail.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${whatsapp_number}`}
                target="_blank"
                rel="noreferrer"
                className="border border-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-bg"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${contact_email}`}
                className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal"
              >
                {contact_email}
              </a>
            </div>
          </div>

          <div className="font-mono text-xs text-muted">
            <p className="uppercase tracking-widest text-text">Links</p>
            <ul className="mt-3 space-y-2">
              {github_url && (
                <li>
                  <a href={github_url} target="_blank" rel="noreferrer" className="hover:text-signal">
                    github.com/RenatoHuard ↗
                  </a>
                </li>
              )}
              {instagram_url && (
                <li>
                  <a href={instagram_url} target="_blank" rel="noreferrer" className="hover:text-signal">
                    @renatohuard ↗
                  </a>
                </li>
              )}
              {linkedin_url && (
                <li>
                  <a href={linkedin_url} target="_blank" rel="noreferrer" className="hover:text-signal">
                    linkedin.com/in/renato-huard ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {brand_logo_url && (
              <img src={brand_logo_url} alt="Renato Huard" className="h-8 w-auto opacity-70" />
            )}
            <p className="font-mono text-[11px] text-muted">
              © {year} Renato Huard. Todos os direitos reservados.
            </p>
          </div>
          <a
            href="/admin/login"
            className="font-mono text-[10px] uppercase tracking-widest text-muted/30 hover:text-muted"
          >
            login
          </a>
        </div>

      </div>
    </footer>
  );
}
