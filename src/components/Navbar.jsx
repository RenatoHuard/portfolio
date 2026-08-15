import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/#contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={close}
          className="font-display text-lg font-semibold tracking-tight text-text"
        >
          <span className="text-signal">&gt;</span> renato
          <span className="text-muted">.huard</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted md:flex">
          {links.map((link) => (
            <li key={link.label}>
              {link.to.startsWith("/#") ? (
                <a href={link.to} className="transition-colors hover:text-signal">
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    "transition-colors hover:text-signal " + (isActive ? "text-signal" : "")
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-5 bg-muted transition-all duration-200 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-muted transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-muted transition-all duration-200 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur transition-all duration-300 md:hidden ${
          open ? "max-h-64" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {links.map((link) => (
            <li key={link.label} className="border-b border-line/40 last:border-0">
              {link.to.startsWith("/#") ? (
                <a
                  href={link.to}
                  onClick={close}
                  className="block py-3.5 font-mono text-sm uppercase tracking-widest text-muted hover:text-signal"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={close}
                  className={({ isActive }) =>
                    "block py-3.5 font-mono text-sm uppercase tracking-widest hover:text-signal " +
                    (isActive ? "text-signal" : "text-muted")
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
