# renato-portfolio

Portfolio pessoal de Renato Huard — dev full-stack. React + Vite + Tailwind v4 + react-router-dom.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção (gera pasta dist/)

```bash
npm run build
```

Faça upload do conteúdo de `dist/` para a hospedagem (Hostinger). Como é uma SPA
com rotas (`/portfolio`, `/projetos/:slug`, `/crushdex`), configure o servidor
para redirecionar todas as rotas para `index.html` (fallback SPA) — no Apache/Hostinger
isso é feito com um `.htaccess`:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
Coloque esse arquivo dentro de `dist/` antes do upload.

## Estrutura

- `src/data/projects.js` — dados dos projetos (Jes Sys, Talk to Move, CrushDex).
  Preparado para ser substituído por uma consulta ao Supabase quando o backend
  de gestão de projetos existir.
- `src/pages/` — Home, Portfolio, ProjectDetail (`/projetos/:slug`), CrushDex.
- `src/components/` — Navbar, Footer, ProjectCard, TerminalLine (efeito de boot no hero).
