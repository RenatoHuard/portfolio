// Fonte de dados dos projetos do portfolio.
// Estrutura pensada para, futuramente, ser substituída por uma consulta
// ao Supabase (tabela `projects`) sem precisar alterar os componentes
// que consomem esses dados — troque este export por um fetch/hook.

export const projects = [
  {
    slug: "jes-sys",
    title: "Jes Sys",
    tag: "SYS.01",
    status: "Em desenvolvimento",
    summary:
      "Sistema de gestão para escolas de dança: turmas, matrículas, horários e controle administrativo em um painel único.",
    description: [
      "Jes Sys é uma plataforma de gestão construída para escolas de dança organizarem turmas, horários semanais, matrículas e rotina administrativa em um único painel.",
      "O sistema resolve um problema comum em escolas com múltiplas turmas por dia: conflitos de agenda, edições manuais em planilhas e falta de visibilidade sobre o que está acontecendo em cada turma.",
      "Arquitetura pensada para múltiplas aulas por dia por turma, com edições administrativas controladas por um fluxo de pendências antes de irem para produção.",
    ],
    stack: ["React", "Supabase", "Node.js", "PostgreSQL"],
    links: {
      repo: "https://github.com/RenatoHuard/site-jessy",
      demo: null,
    },
    color: "signal",
  },
  {
    slug: "talk-to-move",
    title: "Talk to Move",
    tag: "SYS.02",
    status: "Em produção",
    summary:
      "Plataforma de gestão para escola de idiomas: turmas, aulas, agenda e videoconferência integrada para professores e alunos.",
    description: [
      "Talk to Move (TTM) é o sistema de gestão de uma escola de idiomas em produção, cobrindo desde o cadastro de turmas até o controle financeiro e a rotina diária de aulas.",
      "Inclui um dashboard administrativo com painéis de detalhamento (drill-down) por turma, status de 'semana off' e correções de agenda em tempo real.",
      "A plataforma conta com videoconferência integrada via Jitsi (JaaS), com autenticação JWT diferenciando o papel de professor (moderador) e aluno (participante) — substituindo a dependência de uma assinatura paga de terceiros.",
    ],
    stack: ["React", "Supabase", "Node.js", "Jitsi JaaS", "Mercado Pago"],
    links: {
      repo: "https://github.com/RenatoHuard/Projeto-TTM",
      demo: null,
    },
    color: "violet",
  },
];

export const crushdex = {
  slug: "crushdex",
  title: "CrushDex",
  tag: "SYS.03",
  status: "App Android",
  summary:
    "Aplicativo para catalogar e organizar seus 'crushes' de forma leve e divertida.",
  description: [
    "CrushDex é um aplicativo Android para catalogar, organizar e acompanhar seus interesses amorosos — os 'crushes' — de forma simples e direta.",
    "Construído para uso pessoal ágil: cadastro rápido, histórico organizado e uma experiência leve, sem fricção.",
  ],
  stack: ["TypeScript", "React Native", "Supabase"],
  apkUrl:
    "https://ugfzarhpjfmvyrnquztg.supabase.co/storage/v1/object/public/releases/android/crushdex-latest.apk",
  repo: "https://github.com/RenatoHuard/crushroll",
};
