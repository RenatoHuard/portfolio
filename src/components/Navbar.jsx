import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/#contato", label: "Contato" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-text">
          <span className="text-signal">&gt;</span> renato<span className="text-muted">.huard</span>
        </Link>
        <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
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
      </nav>
    </header>
  );
}
