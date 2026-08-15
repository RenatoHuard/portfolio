-- =============================================================
-- SUPABASE SEED — 6 projetos iniciais do portfolio
-- Rodar DEPOIS da migration, no SQL Editor
-- =============================================================

INSERT INTO public.projects (slug, title, tag, status, summary, description, stack, color, link_repo, link_demo, display_order)
VALUES
(
  'jes-sys', 'Jes Sys', 'SYS.01', 'Em desenvolvimento',
  'Sistema de gestão multi-escola para dança: financeiro, matrículas, turmas e controle administrativo com perfis distintos para secretaria e professores.',
  '["Jes Sys é uma plataforma de gestão pensada para operar múltiplas escolas de dança a partir de um único sistema — cobrindo cadastros de alunos, controle de turmas, agenda de aulas e módulo financeiro integrado.", "O sistema distingue dois perfis de acesso: secretaria/admin, que gerencia a operação completa (matrículas, cobranças, relatórios e configurações das escolas), e professores, que acessam sua própria agenda, turmas e lista de alunos sem visibilidade sobre os demais dados.", "Arquitetura projetada para escalar: uma mesma instância do sistema serve múltiplas unidades, cada uma com seus próprios cadastros e financeiro, mas sob gestão centralizada de quem administra a rede."]'::jsonb,
  '["React", "Supabase", "Node.js", "PostgreSQL"]'::jsonb,
  'signal', 'https://github.com/RenatoHuard/Jess-Sys', null, 1
),
(
  'talk-to-move', 'Talk to Move', 'SYS.02', 'Em produção',
  'Plataforma de gestão para escola de idiomas: turmas, aulas, agenda e videoconferência integrada para professores e alunos.',
  '["Talk to Move (TTM) é o sistema de gestão de uma escola de idiomas em produção, cobrindo desde o cadastro de turmas até o controle financeiro e a rotina diária de aulas.", "Inclui um dashboard administrativo com painéis de detalhamento (drill-down) por turma, status de semana off e correções de agenda em tempo real.", "A plataforma conta com videoconferência integrada via Jitsi (JaaS), com autenticação JWT diferenciando o papel de professor (moderador) e aluno (participante) — substituindo a dependência de uma assinatura paga de terceiros."]'::jsonb,
  '["React", "Supabase", "Node.js", "Jitsi JaaS", "Mercado Pago"]'::jsonb,
  'violet', 'https://github.com/RenatoHuard/Sistema-Talk-To-Move', null, 2
),
(
  'painel-prefeitura', 'Painel Prefeitura RJ', 'SYS.03', 'Desafio Técnico',
  'Painel administrativo para acompanhamento de crianças em vulnerabilidade social — desafio técnico que levou à etapa final do processo seletivo de Full Stack na Prefeitura do Rio de Janeiro.',
  '["O Painel Prefeitura foi desenvolvido como desafio técnico para a vaga de desenvolvedor Full Stack na Prefeitura do Rio de Janeiro — e levou à etapa final do processo seletivo.", "O sistema centraliza dados de saúde, educação e assistência social de 25 crianças em situação de vulnerabilidade, permitindo que técnicos de campo filtrem por nome, bairro, alertas e área de atuação. Inclui um mapa de calor de bairros via Leaflet, gráficos analíticos e histórico completo de revisões por criança.", "Stack completa com Next.js 14 (App Router) no front-end, Node.js com Fastify e TypeScript no back-end, autenticação JWT, PostgreSQL via Prisma ORM e cobertura de testes com Jest, Vitest e Playwright (83 testes no total). Deploy em Vercel e Render."]'::jsonb,
  '["Next.js 14", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Playwright"]'::jsonb,
  'signal', 'https://github.com/RenatoHuard/painel-prefeitura', 'https://desafiorj.renatohuard.com.br', 3
),
(
  'piccione-removals', 'Piccione Removals', 'WEB.01', 'No ar',
  'Site institucional para empresa de mudanças em Perth, Austrália — desenvolvido do zero com painel admin próprio que permite ao cliente editar logo, cores e todo o conteúdo sem banco de dados, CMS externo ou conhecimento técnico.',
  '["Piccione Removals é uma empresa familiar de mudanças residenciais e comerciais em Perth, Austrália, com mais de 10 anos de operação e 500+ mudanças realizadas.", "O desafio central do projeto era a autonomia do cliente: ele precisava conseguir trocar logo, alterar cores da marca, editar todos os textos e fazer o upload de imagens — tudo sem tocar em código, servidor ou contratar suporte. A solução foi um painel admin próprio em /admin protegido por JWT. Quando o cliente salva uma alteração, o Express atualiza um único arquivo config.json que serve como fonte de verdade do site, sem banco de dados.", "Frontend em Vite + Vanilla JS para máxima leveza, Express no backend, deploy em Hostinger com PM2 e Nginx como proxy reverso com SSL. Arquitetura simples, resiliente e sem custos de infraestrutura recorrentes além da hospedagem."]'::jsonb,
  '["Vite", "Vanilla JS", "Express.js", "JWT", "PM2", "Nginx"]'::jsonb,
  'amber', null, 'https://piccioneremovals.com.au/', 4
),
(
  'jr-dancing', 'JR Dancing', 'WEB.02', 'No ar',
  'Plataforma profissional de Jéssica Rayane — licenciada em Dança e mestranda pela UnB — com área de assinantes para cursos, materiais e clube de leitura.',
  '["Jéssica Rayane é professora de Ballet e Jazz, coordenadora de escolas de dança, licenciada em Dança e mestranda pela Universidade de Brasília. O site é a sua plataforma profissional: apresenta sua trajetória e atuação, e serve como infraestrutura real para os cursos que ela oferece e para o clube de leitura que coordena.", "A parte central do projeto é a área de assinantes: quem se inscreve nos cursos ou no clube de leitura acessa materiais exclusivos — conteúdos, textos, gravações e recursos — diretamente pela plataforma, sem depender de grupos de WhatsApp, Google Drive compartilhado ou links avulsos.", "O backend entrega um painel admin onde Jéssica gerencia assinantes, publica materiais e atualiza conteúdo de forma independente. A escolha por banco de dados foi necessária pela natureza dinâmica do conteúdo: posts, materiais por assinante e histórico de publicações do clube de leitura."]'::jsonb,
  '["Vite", "Express.js", "Supabase", "JWT", "PM2", "Nginx"]'::jsonb,
  'signal', 'https://github.com/RenatoHuard/site-jessy', 'https://jrdancing.com.br/', 5
),
(
  'alvaro-alves', 'Álvaro Alves', 'WEB.03', 'No ar',
  'Site com blog para profissional liberal — desenvolvido do zero com painel admin e banco de dados próprios que permitem ao cliente publicar e editar conteúdo sem WordPress, servidor ou conhecimento técnico.',
  '["O site do Álvaro Alves foi construído do zero com uma premissa clara: o cliente precisa conseguir criar e editar posts de blog, atualizar textos e gerir conteúdo de forma completamente independente — sem aprender WordPress, sem acessar um painel de hospedagem e sem precisar de suporte técnico para cada mudança.", "A solução segue a mesma arquitetura dos demais sites institucionais: painel admin protegido por JWT com Express no backend. A diferença está na estrutura de blog, que exige banco de dados para persistir posts, categorias e histórico de publicações. O frontend consome essa API e renderiza as páginas de forma otimizada para leitura e SEO.", "O resultado é um site controlado inteiramente pelo cliente, com a autonomia de um WordPress mas sem nenhuma de suas dependências, custos de plugin ou overhead de infraestrutura."]'::jsonb,
  '["Vite", "Express.js", "Supabase", "JWT", "PM2", "Nginx"]'::jsonb,
  'violet', null, 'https://alvaroalves.com', 6
)
ON CONFLICT (slug) DO NOTHING;

-- ── SCREENSHOTS (captions) — substitua pelas descrições reais quando tiver as imagens ──

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Dashboard do admin com visão consolidada das escolas: total de alunos ativos, inadimplência do mês e turmas em andamento.'),
  (2, 'Módulo financeiro: lançamentos, status de pagamento por aluno, histórico de cobranças e indicadores de receita.'),
  (3, 'Cadastro de alunos com dados pessoais, responsáveis, turma vinculada e situação financeira.'),
  (4, 'Gestão de turmas: modalidade, nível, professor responsável, capacidade e grade de horários semanais.'),
  (5, 'Visão do professor: agenda pessoal com aulas do dia, lista de alunos por turma e registro de presença.'),
  (6, 'Controle multi-escola: seleção de unidade ativa e visão comparativa entre escolas da rede.'),
  (7, 'Relatório de matrículas por período com filtros por escola, modalidade e status do aluno.'),
  (8, 'Configurações de perfil e permissões: criação de usuários secretaria/admin e professores por unidade.')
) AS v(pos, cap)
WHERE p.slug = 'jes-sys'
ON CONFLICT (project_id, position) DO NOTHING;

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Dashboard principal com visão geral das turmas ativas, próximas aulas e indicadores financeiros do mês.'),
  (2, 'Drill-down de turma: detalhamento de alunos, histórico de aulas e status da semana atual.'),
  (3, 'Agenda semanal integrada com cor por turma e indicador de semana off quando aplicável.'),
  (4, 'Sala de videoconferência integrada via Jitsi JaaS com controles de moderação para o professor.'),
  (5, 'Tela de aluno: acesso às aulas agendadas, link de entrada na videochamada e histórico de sessões.'),
  (6, 'Painel financeiro com cobranças, status de pagamento via Mercado Pago e histórico por aluno.'),
  (7, 'Cadastro e edição de turmas: horários, nível, professor responsável e capacidade máxima.'),
  (8, 'Correção de agenda em tempo real: alteração de horários com notificação automática para os envolvidos.')
) AS v(pos, cap)
WHERE p.slug = 'talk-to-move'
ON CONFLICT (project_id, position) DO NOTHING;

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Tela de login com autenticação JWT. Credenciais de demonstração: tecnico@prefeitura.rio / painel@2024.'),
  (2, 'Dashboard principal com 3 cards de resumo clicáveis: total de crianças, alertas ativos e revisões pendentes.'),
  (3, 'Listagem de 25 crianças com filtros combinados por nome, bairro, área de atuação e nível de alerta.'),
  (4, 'Tela de detalhamento individual com dados de saúde, educação e assistência social consolidados.'),
  (5, 'Histórico de revisões por criança com linha do tempo de alterações e técnico responsável por cada entrada.'),
  (6, 'Mapa de calor de bairros via Leaflet mostrando concentração de casos por região da cidade.'),
  (7, 'Gráficos analíticos: distribuição por área de atuação (pizza) e evolução de alertas no período (barras).'),
  (8, 'Dark mode automático e layout responsivo de 375px a 1440px com conformidade WCAG AA.')
) AS v(pos, cap)
WHERE p.slug = 'painel-prefeitura'
ON CONFLICT (project_id, position) DO NOTHING;

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Hero section do site com headline principal, chamada para ação e número de contato em destaque.'),
  (2, 'Seção de serviços detalhando mudanças residenciais, comerciais e opções de armazenamento.'),
  (3, 'Tabela de preços transparente com tarifas horárias e mínimo de 2 horas por atendimento.'),
  (4, 'Depoimentos de clientes com avaliação 5 estrelas e mais de 500 mudanças realizadas.'),
  (5, 'Seção de diferenciais: equipe experiente, equipamento profissional e atendimento de segunda a sábado.'),
  (6, 'Formulário de contato com múltiplos canais: telefone, SMS, email e WhatsApp integrados.'),
  (7, 'Painel admin em /admin: interface de edição de conteúdo protegida por senha JWT.'),
  (8, 'Visualização mobile responsiva — experiência de contato otimizada para dispositivos móveis.')
) AS v(pos, cap)
WHERE p.slug = 'piccione-removals'
ON CONFLICT (project_id, position) DO NOTHING;

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Página inicial com apresentação profissional de Jéssica Rayane: trajetória, formação e áreas de atuação.'),
  (2, 'Seção de cursos disponíveis com descrição, carga horária e botão de inscrição para assinantes.'),
  (3, 'Clube de leitura: apresentação da proposta, livros em andamento e como participar.'),
  (4, 'Área do assinante: painel de acesso com materiais dos cursos e conteúdos exclusivos organizados por módulo.'),
  (5, 'Material de curso: visualização de conteúdo protegido disponível apenas para assinantes ativos.'),
  (6, 'Acervo do clube de leitura: textos, gravações e recursos de leitura acessíveis via login.'),
  (7, 'Painel admin: gestão de assinantes, publicação de materiais e atualização de conteúdo do site.'),
  (8, 'Versão mobile com navegação fluida e acesso aos materiais otimizado para leitura em dispositivos menores.')
) AS v(pos, cap)
WHERE p.slug = 'jr-dancing'
ON CONFLICT (project_id, position) DO NOTHING;

INSERT INTO public.project_screenshots (project_id, position, caption)
SELECT p.id, v.pos, v.cap FROM public.projects p,
(VALUES
  (1::smallint, 'Página inicial com apresentação do profissional, chamada para ação e posts recentes em destaque.'),
  (2, 'Listagem do blog com cards de posts, categorias, data de publicação e prévia do conteúdo.'),
  (3, 'Post individual com texto formatado, imagem de capa e seção de posts relacionados ao final.'),
  (4, 'Página sobre o profissional com trajetória, áreas de atuação e formas de contato.'),
  (5, 'Seção de serviços com detalhamento do que o profissional oferece.'),
  (6, 'Página de contato com formulário e links para redes sociais.'),
  (7, 'Painel admin: editor de posts com campos de título, conteúdo, categoria e imagem de capa.'),
  (8, 'Visualização mobile com tipografia otimizada para leitura de artigos em dispositivos menores.')
) AS v(pos, cap)
WHERE p.slug = 'alvaro-alves'
ON CONFLICT (project_id, position) DO NOTHING;
