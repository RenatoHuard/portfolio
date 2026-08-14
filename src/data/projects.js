// Fonte de dados dos projetos do portfolio.
// Screenshots: coloque os arquivos em public/screenshots/ e substitua src: null pelo caminho.
// Exemplo: src: "/screenshots/jes-sys-1.png"

// Gera 8 slots de screenshot com legendas lorem ipsum.
// Substitua `caption` pela descrição real de cada tela quando adicionar a imagem.
function screens(captions) {
  return captions.map((caption) => ({ src: null, caption }));
}

export const projects = [
  {
    slug: "jes-sys",
    title: "Jes Sys",
    tag: "SYS.01",
    status: "Em desenvolvimento",
    summary:
      "Sistema de gestão multi-escola para dança: financeiro, matrículas, turmas e controle administrativo com perfis distintos para secretaria e professores.",
    description: [
      "Jes Sys é uma plataforma de gestão pensada para operar múltiplas escolas de dança a partir de um único sistema — cobrindo cadastros de alunos, controle de turmas, agenda de aulas e módulo financeiro integrado.",
      "O sistema distingue dois perfis de acesso: secretaria/admin, que gerencia a operação completa (matrículas, cobranças, relatórios e configurações das escolas), e professores, que acessam sua própria agenda, turmas e lista de alunos sem visibilidade sobre os demais dados.",
      "Arquitetura projetada para escalar: uma mesma instância do sistema serve múltiplas unidades, cada uma com seus próprios cadastros e financeiro, mas sob gestão centralizada de quem administra a rede.",
    ],
    stack: ["React", "Supabase", "Node.js", "PostgreSQL"],
    links: {
      repo: "https://github.com/RenatoHuard/Jess-Sys",
      demo: null,
    },
    screenshots: screens([
      "Lorem ipsum — dashboard do admin com visão consolidada das escolas: total de alunos ativos, inadimplência do mês e turmas em andamento.",
      "Lorem ipsum — módulo financeiro: lançamentos, status de pagamento por aluno, histórico de cobranças e indicadores de receita.",
      "Lorem ipsum — cadastro de alunos com dados pessoais, responsáveis, turma vinculada e situação financeira.",
      "Lorem ipsum — gestão de turmas: modalidade, nível, professor responsável, capacidade e grade de horários semanais.",
      "Lorem ipsum — visão do professor: agenda pessoal com aulas do dia, lista de alunos por turma e registro de presença.",
      "Lorem ipsum — controle multi-escola: seleção de unidade ativa e visão comparativa entre escolas da rede.",
      "Lorem ipsum — relatório de matrículas por período com filtros por escola, modalidade e status do aluno.",
      "Lorem ipsum — configurações de perfil e permissões: criação de usuários secretaria/admin e professores por unidade.",
    ]),
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
      repo: "https://github.com/RenatoHuard/Sistema-Talk-To-Move",
      demo: null,
    },
    screenshots: screens([
      "Lorem ipsum — dashboard principal com visão geral das turmas ativas, próximas aulas e indicadores financeiros do mês.",
      "Lorem ipsum — drill-down de turma: detalhamento de alunos, histórico de aulas e status da semana atual.",
      "Lorem ipsum — agenda semanal integrada com cor por turma e indicador de 'semana off' quando aplicável.",
      "Lorem ipsum — sala de videoconferência integrada via Jitsi JaaS com controles de moderação para o professor.",
      "Lorem ipsum — tela de aluno: acesso às aulas agendadas, link de entrada na videochamada e histórico de sessões.",
      "Lorem ipsum — painel financeiro com cobranças, status de pagamento via Mercado Pago e histórico por aluno.",
      "Lorem ipsum — cadastro e edição de turmas: horários, nível, professor responsável e capacidade máxima.",
      "Lorem ipsum — correção de agenda em tempo real: alteração de horários com notificação automática para os envolvidos.",
    ]),
    color: "violet",
  },
  {
    slug: "painel-prefeitura",
    title: "Painel Prefeitura RJ",
    tag: "SYS.03",
    status: "Desafio Técnico",
    summary:
      "Painel administrativo para acompanhamento de crianças em vulnerabilidade social — desafio técnico que levou à etapa final do processo seletivo de Full Stack na Prefeitura do Rio de Janeiro.",
    description: [
      "O Painel Prefeitura foi desenvolvido como desafio técnico para a vaga de desenvolvedor Full Stack na Prefeitura do Rio de Janeiro — e levou à etapa final do processo seletivo.",
      "O sistema centraliza dados de saúde, educação e assistência social de 25 crianças em situação de vulnerabilidade, permitindo que técnicos de campo filtrem por nome, bairro, alertas e área de atuação. Inclui um mapa de calor de bairros via Leaflet, gráficos analíticos e histórico completo de revisões por criança.",
      "Stack completa com Next.js 14 (App Router) no front-end, Node.js com Fastify e TypeScript no back-end, autenticação JWT, PostgreSQL via Prisma ORM e cobertura de testes com Jest, Vitest e Playwright (83 testes no total). Deploy em Vercel e Render.",
    ],
    stack: ["Next.js 14", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Playwright"],
    links: {
      repo: "https://github.com/RenatoHuard/painel-prefeitura",
      demo: "https://desafiorj.renatohuard.com.br",
    },
    screenshots: screens([
      "Lorem ipsum — tela de login com autenticação JWT. Credenciais de demonstração: tecnico@prefeitura.rio / painel@2024.",
      "Lorem ipsum — dashboard principal com 3 cards de resumo clicáveis: total de crianças, alertas ativos e revisões pendentes.",
      "Lorem ipsum — listagem de 25 crianças com filtros combinados por nome, bairro, área de atuação e nível de alerta.",
      "Lorem ipsum — tela de detalhamento individual com dados de saúde, educação e assistência social consolidados.",
      "Lorem ipsum — histórico de revisões por criança com linha do tempo de alterações e técnico responsável por cada entrada.",
      "Lorem ipsum — mapa de calor de bairros via Leaflet mostrando concentração de casos por região da cidade.",
      "Lorem ipsum — gráficos analíticos: distribuição por área de atuação (pizza) e evolução de alertas no período (barras).",
      "Lorem ipsum — dark mode automático e layout responsivo de 375px a 1440px com conformidade WCAG AA.",
    ]),
    color: "signal",
  },
  {
    slug: "piccione-removals",
    title: "Piccione Removals",
    tag: "WEB.01",
    status: "No ar",
    summary:
      "Site institucional para empresa de mudanças em Perth, Austrália — desenvolvido do zero com painel admin próprio que permite ao cliente editar logo, cores e todo o conteúdo sem banco de dados, CMS externo ou conhecimento técnico.",
    description: [
      "Piccione Removals é uma empresa familiar de mudanças residenciais e comerciais em Perth, Austrália, com mais de 10 anos de operação e 500+ mudanças realizadas.",
      "O desafio central do projeto era a autonomia do cliente: ele precisava conseguir trocar logo, alterar cores da marca, editar todos os textos (hero, serviços, depoimentos, FAQ, contato) e fazer o upload de imagens — tudo sem tocar em código, servidor ou contratar suporte. A solução foi um painel admin próprio em /admin protegido por JWT. Quando o cliente salva uma alteração, o Express atualiza um único arquivo config.json que serve como fonte de verdade do site, sem banco de dados.",
      "Frontend em Vite + Vanilla JS para máxima leveza, Express no backend, deploy em Hostinger com PM2 e Nginx como proxy reverso com SSL. Arquitetura simples, resiliente e sem custos de infraestrutura recorrentes além da hospedagem.",
    ],
    stack: ["Vite", "Vanilla JS", "Express.js", "JWT", "PM2", "Nginx"],
    links: {
      demo: "https://piccioneremovals.com.au/",
      repo: null,
    },
    screenshots: screens([
      "Lorem ipsum — hero section do site com headline principal, chamada para ação e número de contato em destaque.",
      "Lorem ipsum — seção de serviços detalhando mudanças residenciais, comerciais e opções de armazenamento.",
      "Lorem ipsum — tabela de preços transparente com tarifas horárias e mínimo de 2 horas por atendimento.",
      "Lorem ipsum — depoimentos de clientes com avaliação 5 estrelas e mais de 500 mudanças realizadas.",
      "Lorem ipsum — seção de diferenciais: equipe experiente, equipamento profissional e atendimento de segunda a sábado.",
      "Lorem ipsum — formulário de contato com múltiplos canais: telefone, SMS, email e WhatsApp integrados.",
      "Lorem ipsum — painel admin em /admin: interface de edição de conteúdo protegida por senha JWT.",
      "Lorem ipsum — visualização mobile responsiva — experiência de contato otimizada para dispositivos móveis.",
    ]),
    color: "amber",
  },
  {
    slug: "jr-dancing",
    title: "JR Dancing",
    tag: "WEB.02",
    status: "No ar",
    summary:
      "Plataforma profissional de Jéssica Rayane — licenciada em Dança e mestranda pela UnB — com área de assinantes para cursos, materiais e clube de leitura.",
    description: [
      "Jéssica Rayane é professora de Ballet e Jazz, coordenadora de escolas de dança, licenciada em Dança e mestranda pela Universidade de Brasília. O site é a sua plataforma profissional: apresenta sua trajetória e atuação, e serve como infraestrutura real para os cursos que ela oferece e para o clube de leitura que coordena.",
      "A parte central do projeto é a área de assinantes: quem se inscreve nos cursos ou no clube de leitura acessa materiais exclusivos — conteúdos, textos, gravações e recursos — diretamente pela plataforma, sem depender de grupos de WhatsApp, Google Drive compartilhado ou links avulsos.",
      "O backend entrega um painel admin onde Jéssica gerencia assinantes, publica materiais e atualiza conteúdo de forma independente. A escolha por banco de dados (ao contrário da arquitetura config.json do Piccione) foi necessária pela natureza dinâmica do conteúdo: posts, materiais por assinante e histórico de publicações do clube de leitura.",
    ],
    stack: ["Vite", "Express.js", "Supabase", "JWT", "PM2", "Nginx"],
    links: {
      demo: "https://jrdancing.com.br/",
      repo: "https://github.com/RenatoHuard/site-jessy",
    },
    screenshots: screens([
      "Lorem ipsum — página inicial com apresentação profissional de Jéssica Rayane: trajetória, formação e áreas de atuação.",
      "Lorem ipsum — seção de cursos disponíveis com descrição, carga horária e botão de inscrição para assinantes.",
      "Lorem ipsum — clube de leitura: apresentação da proposta, livros em andamento e como participar.",
      "Lorem ipsum — área do assinante: painel de acesso com materiais dos cursos e conteúdos exclusivos organizados por módulo.",
      "Lorem ipsum — material de curso: visualização de conteúdo protegido disponível apenas para assinantes ativos.",
      "Lorem ipsum — acervo do clube de leitura: textos, gravações e recursos de leitura acessíveis via login.",
      "Lorem ipsum — painel admin: gestão de assinantes, publicação de materiais e atualização de conteúdo do site.",
      "Lorem ipsum — versão mobile com navegação fluida e acesso aos materiais otimizado para leitura em dispositivos menores.",
    ]),
    color: "signal",
  },
  {
    slug: "alvaro-alves",
    title: "Álvaro Alves",
    tag: "WEB.03",
    status: "No ar",
    summary:
      "Site com blog para profissional liberal — desenvolvido do zero com painel admin e banco de dados próprios que permitem ao cliente publicar e editar conteúdo sem WordPress, servidor ou conhecimento técnico.",
    description: [
      "O site do Álvaro Alves foi construído do zero com uma premissa clara: o cliente precisa conseguir criar e editar posts de blog, atualizar textos e gerir conteúdo de forma completamente independente — sem aprender WordPress, sem acessar um painel de hospedagem e sem precisar de suporte técnico para cada mudança.",
      "A solução segue a mesma arquitetura dos demais sites institucionais: painel admin protegido por JWT com Express no backend. A diferença está na estrutura de blog, que exige banco de dados para persistir posts, categorias e histórico de publicações. O frontend consome essa API e renderiza as páginas de forma otimizada para leitura e SEO.",
      "O resultado é um site controlado inteiramente pelo cliente, com a autonomia de um WordPress mas sem nenhuma de suas dependências, custos de plugin ou overhead de infraestrutura.",
    ],
    stack: ["Vite", "Express.js", "Supabase", "JWT", "PM2", "Nginx"],
    links: {
      demo: "https://alvaroalves.com",
      repo: null,
    },
    screenshots: screens([
      "Lorem ipsum — página inicial com apresentação do profissional, chamada para ação e posts recentes em destaque.",
      "Lorem ipsum — listagem do blog com cards de posts, categorias, data de publicação e prévia do conteúdo.",
      "Lorem ipsum — post individual com texto formatado, imagem de capa e seção de posts relacionados ao final.",
      "Lorem ipsum — página sobre o profissional com trajetória, áreas de atuação e formas de contato.",
      "Lorem ipsum — seção de serviços ou portfólio com detalhamento do que o profissional oferece.",
      "Lorem ipsum — página de contato com formulário e links para redes sociais.",
      "Lorem ipsum — painel admin: editor de posts com campos de título, conteúdo, categoria e imagem de capa.",
      "Lorem ipsum — visualização mobile com tipografia otimizada para leitura de artigos em dispositivos menores.",
    ]),
    color: "violet",
  },
];

export const crushdex = {
  slug: "crushdex",
  title: "CrushDex",
  tag: "SYS.04",
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
