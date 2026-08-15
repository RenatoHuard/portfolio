export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contato" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">SYS.END // Contato</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-text">
              Vamos construir alguma coisa.
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted">
              Aberto a projetos de desenvolvimento, automação de processos e consultoria
              técnica. Resposta rápida por WhatsApp ou e-mail.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/5513982126596"
                target="_blank"
                rel="noreferrer"
                className="border border-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-bg"
              >
                Chamar no WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/renato-huard/"
                target="_blank"
                rel="noreferrer"
                className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="font-mono text-xs text-muted">
            <p className="uppercase tracking-widest text-text">Links</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://github.com/RenatoHuard" target="_blank" rel="noreferrer" className="hover:text-signal">
                  github.com/RenatoHuard
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/renatohuard" target="_blank" rel="noreferrer" className="hover:text-signal">
                  @renatohuard
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/renato-huard/" target="_blank" rel="noreferrer" className="hover:text-signal">
                  linkedin.com/in/renato-huard
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between">
          <p className="font-mono text-[11px] text-muted">
            © {year} Renato Huard. Todos os direitos reservados.
          </p>
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
