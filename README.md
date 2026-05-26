<p align="center">
  <h1 align="center">🎓 Sistema de Indicadores de Extensão — Front-end</h1>
  <p align="center">
    Interface web em React para visualização e análise de indicadores de projetos de extensão universitária.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-9.36-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 📋 Índice

- [📖 Descrição do Projeto](#-descrição-do-projeto)
- [🧩 Visão Geral e Arquitetura](#-visão-geral-e-arquitetura)
- [📂 Estrutura Geral do Repositório](#-estrutura-geral-do-repositório)
- [🏗️ Arquitetura de Componentes](#️-arquitetura-de-componentes)
- [🛠️ Tecnologias e Bibliotecas](#️-tecnologias-e-bibliotecas)
- [⚙️ Configuração e Execução Local](#️-configuração-e-execução-local)
- [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🌐 Hospedagem e Deploy](#-hospedagem-e-deploy)
- [🤝 Boas Práticas de Contribuição](#-boas-práticas-de-contribuição)

---

## 📖 Descrição do Projeto

O **Sistema de Indicadores de Extensão** é uma aplicação desenvolvida com o objetivo de:
Identificar e disponibilizar dados e indicadores das ações de extensão para atender às necessidades da comunidade acadêmica, visando promover a transparência e a agilidade nas avaliações internas e externas da UNIPAMPA.

Este repositório contém o **front-end** do sistema — a interface web que consome a API REST do back-end para exibir dashboards, gráficos interativos e permitir a gestão dos dados de extensão.

### ✨ Principais funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🏠 **Página Inicial (Home)** | Apresentação institucional do sistema com visão geral do projeto |
| 📊 **Dashboard de Indicadores** | Painel interativo com gráficos e filtros avançados para análise dos dados de extensão |
| 📤 **Upload de Dados** | Interface para importação de planilhas CSV com dados dos projetos (rota protegida) |
| 🔐 **Autenticação** | Sistema de login para controle de acesso às funcionalidades administrativas |
| ℹ️ **Sobre** | Página institucional com informações sobre o projeto e a equipe |
| ❓ **Ajuda** | Seção de perguntas frequentes (FAQ) com componentes de accordion |

---

## 🧩 Visão Geral e Arquitetura

# Instruções

Seja muito bem-vindo(a) ao projeto **Sistema de Indicadores de Extensão**! Este documento é o seu ponto de partida: aqui você vai encontrar tudo o que precisa para entender a infraestrutura atual e configurar o ambiente para começar a contribuir.

### Arquitetura Multi-Repositório

O projeto é dividido em **dois repositórios separados**, cada um com sua própria stack e responsabilidade:

| Repositório | Stack | Responsabilidade |
|---|---|---|
| 📦 **Front-end** (este repositório) | React + TypeScript + Vite | Interface web — visualização de dados, gráficos, formulários e interação com o usuário |
| 📦 **Back-end** | Python + FastAPI + Supabase | API REST — processamento de dados, cálculos de indicadores, autenticação e persistência |

```
┌─────────────────────────┐         ┌─────────────────────────┐
│     FRONT-END (React)   │  HTTP   │    BACK-END (FastAPI)   │
│   Interface do Usuário  │ ◄─────► │       API REST          │
│   Gráficos / Filtros    │  Axios  │   Cálculos / Dados      │
└─────────────────────────┘         └──────────┬──────────────┘
                                               │
                                               ▼
                                    ┌──────────────────────┐
                                    │   Supabase (PostgreSQL)│
                                    │     Banco de Dados     │
                                    └──────────────────────┘
```

> ⚠️ **IMPORTANTE:** Para a aplicação funcionar **localmente de ponta a ponta**, você precisará clonar e rodar **ambos os repositórios** simultaneamente — o front-end (interface) e o back-end (API).

### 🔗 Repositório do Back-end

Clone e configure também o repositório do back-end seguindo as instruções do seu próprio README:

👉 **Link do Back-end:** https://github.com/MilenaSf00/sistema-indicadores-extensao-Back-end

---

## 📂 Estrutura Geral do Repositório

```
indicadores-extensao-front/
│
├── 📄 index.html                # HTML raiz servido pelo Vite
├── 📄 package.json              # Dependências e scripts do projeto
├── 📄 vite.config.ts            # Configuração do bundler Vite
├── 📄 eslint.config.js          # Configuração do linter ESLint
├── 📄 tsconfig.json             # Configuração base do TypeScript
├── 📄 tsconfig.app.json         # Configuração TS para o código da aplicação
├── 📄 tsconfig.node.json        # Configuração TS para scripts Node
├── 📄 .env                      # 🔒 Variáveis de ambiente (NÃO versionado com dados sensíveis)
├── 📄 .gitignore                # Arquivos e pastas ignorados pelo Git
├── 📄 README.md                 # Este arquivo — documentação principal
│
├── 📂 public/                    # ===== ARQUIVOS ESTÁTICOS PÚBLICOS =====
│   ├── 📄 IconUnipampa.png      # Favicon / ícone da universidade
│   └── 📄 vite.svg              # Ícone padrão do Vite
│
├── 📂 src/                       # ===== CÓDIGO-FONTE PRINCIPAL =====
│   ├── 📄 main.tsx              # 🚀 Ponto de entrada — monta o React no DOM
│   ├── 📄 App.tsx               # Componente raiz — layout global e rotas
│   ├── 📄 App.css               # Estilos globais do componente App
│   ├── 📄 index.css             # Reset CSS e variáveis globais
│   ├── 📄 types.ts              # Tipos TypeScript compartilhados
│   │
│   ├── 📂 assets/               # Recursos visuais (imagens, SVGs, GIFs)
│   ├── 📂 components/           # Componentes React (.tsx)
│   ├── 📂 contexts/             # React Contexts (estado global)
│   ├── 📂 css/                  # Estilos CSS por componente
│   └── 📂 services/             # Comunicação com a API (Axios)
│
├── 📂 dist/                      # Build de produção (gerado automaticamente)
└── 📂 node_modules/              # Dependências instaladas (NÃO versionado)
```

### 📄 Arquivos de Configuração na Raiz

| Arquivo | Finalidade |
|---|---|
| `vite.config.ts` | Configura o Vite como bundler com o plugin `@vitejs/plugin-react` para suporte ao React. |
| `eslint.config.js` | Define as regras de linting com suporte a TypeScript, React Hooks e React Refresh. |
| `tsconfig.json` | Configuração raiz do TypeScript que referencia `tsconfig.app.json` e `tsconfig.node.json`. |
| `package.json` | Lista de dependências, scripts (`dev`, `build`, `lint`, `preview`) e metadados do projeto. |
| `.env` | Variáveis de ambiente (ex: URL base da API). **Não deve ser commitado com dados sensíveis.** |
| `.gitignore` | Exclui do versionamento o `node_modules/`, `dist/`, arquivo `.env` e outros artefatos temporários. |

### 📁 Detalhamento dos Diretórios

| Diretório | Finalidade |
|---|---|
| `public/` | Arquivos servidos diretamente sem processamento do Vite (favicons, ícones públicos). |
| `src/assets/` | Imagens, logos, ilustrações e GIFs **importados** nos componentes — passam pelo pipeline do Vite e recebem hashing para otimização de cache. |
| `src/components/` | Todos os componentes React (`.tsx`) da aplicação — desde páginas inteiras até componentes de UI reutilizáveis. |
| `src/contexts/` | React Contexts para gerenciamento de estado global (ex: autenticação). |
| `src/css/` | Arquivos CSS organizados por componente, seguindo a convenção **1 arquivo CSS por componente**. |
| `src/services/` | Camada de serviços com configuração do Axios e funções de chamada à API REST. |
| `dist/` | Pasta de saída gerada pelo `npm run build` — versão compilada e otimizada para produção. |

---

## 🏗️ Arquitetura de Componentes

O projeto separando visualização, lógica de estado e comunicação com o backend.

### Fluxo da Aplicação

```
main.tsx → App.tsx → Router → Páginas → Componentes de UI
                        ↑                       ↓
                   AuthContext            Services (API)
```

### 🔍 Como as responsabilidades são divididas

| Camada | Diretório | Responsabilidade |
|---|---|---|
| **Entrada** | `main.tsx` | Inicializa o React, renderiza o `<App />` e configura providers globais (StrictMode, ToastContainer). |
| **Roteamento** | `App.tsx` | Define todas as rotas da aplicação via React Router, aplica o layout global (Navbar) e envolve a árvore com o `AuthProvider`. |
| **Páginas** | `components/` | Componentes de página (`Home`, `Dashboard`, `Login`, `Upload`, `Sobre`, `Ajuda`) que representam telas completas da aplicação. |
| **UI** | `components/` | Componentes reutilizáveis de interface (`Navbar`, `Footer`, `Tooltip`, `Accordion`, `ChartComponents`, `SkeletonComponents`, `filter`). |
| **Estado Global** | `contexts/` | Gerenciamento de estado via React Context API — atualmente o `AuthContext` controla autenticação, token e dados do usuário logado. |
| **Serviços** | `services/` | Abstração da comunicação HTTP com o backend via Axios (`api.ts` para endpoints de dados e `auth.ts` para autenticação). |
| **Estilos** | `css/` | CSS modular — cada componente possui seu próprio arquivo de estilo correspondente. |
| **Proteção de Rotas** | `PrivateRoute.tsx` | Wrapper que protege rotas autenticadas, redirecionando usuários não logados. |

### 📑 Organização dos Componentes

Os componentes estão divididos em dois grupos principais:

**Componentes de Página** — representam telas inteiras acessíveis por rota:

| Componente | Rota | Descrição |
|---|---|---|
| `Home.tsx` | `/` | Página inicial / landing page do sistema. |
| `Dashboard.tsx` | `/dashboard` | Painel com gráficos interativos e indicadores. |
| `Login.tsx` | `/login` | Formulário de autenticação. |
| `Upload.tsx` | `/upload` | Interface de upload de CSV (rota protegida). |
| `Sobre.tsx` | `/sobre` | Página institucional sobre o projeto. |
| `Ajuda.tsx` | `/ajuda` | Seção de FAQ com accordion. |

**Componentes de UI** — elementos reutilizáveis que compõem as páginas:

| Componente | Descrição |
|---|---|
| `Navbar.tsx` | Barra de navegação superior exibida em todas as páginas. |
| `Footer.tsx` | Rodapé global da aplicação. |
| `ChartComponents.tsx` | Renderização dos gráficos via Recharts. |
| `SkeletonComponents.tsx` | Placeholders visuais de carregamento (skeleton loaders). |
| `filter.tsx` | Componente de filtros para os dados do dashboard. |
| `LeftInfoGraphs.tsx` / `RightInfoGraphs.tsx` | Painéis informativos laterais dos gráficos. |
| `Accordion.tsx` / `AccordionItem.tsx` | Componente de accordion para a seção de FAQ. |
| `Tooltip.tsx` | Componente de tooltip reutilizável. |
| `PrivateRoute.tsx` | HOC para proteção de rotas autenticadas. |

---

## 🛠️ Tecnologias e Bibliotecas

### Linguagem e Framework

| Tecnologia | Versão | Papel no projeto |
|---|---|---|
| ⚛️ **React** | 19.1 | Biblioteca principal para construção da interface com componentes reutilizáveis e gerenciamento de estado reativo. |
| 🟦 **TypeScript** | 5.9 | Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança, autocompletar e detecção de erros em tempo de desenvolvimento. |
| ⚡ **Vite** | 7.1 | Bundler e servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR) para feedback instantâneo durante o desenvolvimento. |
| 🔍 **ESLint** | 9.36 | Ferramenta de análise estática de código que garante a consistência e qualidade do código-fonte por meio de regras configuráveis. |
| 🟢 **Node.js** | — | Ambiente de execução JavaScript necessário para rodar os scripts do projeto (`dev`, `build`, `lint`) e o gerenciador de pacotes `npm`. |

### Bibliotecas Principais

| Biblioteca | Papel no projeto |
|---|---|
| `react-router-dom` | Gerenciamento de rotas e navegação entre páginas (SPA). |
| `axios` | Cliente HTTP para comunicação com a API REST do backend. |
| `recharts` | Biblioteca de gráficos para React, utilizada nos dashboards de indicadores. |
| `react-toastify` / `sonner` | Notificações e toasts para feedback visual ao usuário. |
| `jspdf` + `html2canvas` | Geração de relatórios em PDF a partir dos dashboards e gráficos. |
| `react-text-to-speech` | Recurso de acessibilidade com leitura por voz do conteúdo. |

---

## ⚙️ Configuração e Execução Local

Siga o passo a passo abaixo para clonar o repositório e rodar o projeto localmente no seu notebook.

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js** >= 18 → [Download](https://nodejs.org/)
- ✅ **npm** (gerenciador de pacotes — já incluso com o Node.js)
- ✅ **Git** → [Download](https://git-scm.com/)

> 💡 Para verificar se já estão instalados, execute no terminal:
> ```bash
> node --version
> npm --version
> git --version
> ```

### 1️⃣ Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO_FRONT_END>
cd indicadores-extensao-front
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar as variáveis de ambiente

Crie (ou edite) o arquivo `.env` na raiz do projeto com a URL da API do back-end:

```env
# .env
VITE_API_URL=http://localhost:PORTA_DO_BACKEND
```

> ⚠️ **IMPORTANTE:** A variável `VITE_API_URL` deve apontar para o endereço onde o back-end está rodando. Se o back-end estiver na porta padrão `8000`, use `http://localhost:8000`.

### 4️⃣ Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### ✅ Servidor rodando!

| Recurso | URL |
|---|---|
| 🌐 Aplicação | [http://localhost:5173](http://localhost:5173) |

### 📜 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR (Hot Module Replacement). |
| `npm run build` | Compila o TypeScript e gera o build de produção em `/dist`. |
| `npm run lint` | Executa o ESLint para análise estática do código. |
| `npm run preview` | Serve localmente o build de produção para pré-visualização. |

---

## 🔐 Variáveis de Ambiente

O projeto utiliza um arquivo `.env` para armazenar configurações sensíveis. Esse arquivo **nunca deve ser versionado no Git** (já está no `.gitignore`).

#### Onde criar o arquivo

Crie o arquivo `.env` na **raiz** do repositório do front-end (no mesmo nível do `package.json`).

#### Estrutura do `.env`

```env
# 🔗 URL DA API (Back-end)
VITE_API_URL=http://localhost:8000
```

> ⚠️ **WARNING:** Todas as variáveis de ambiente que precisam ser acessíveis no código React **devem** ter o prefixo `VITE_`. Variáveis sem esse prefixo não serão expostas ao código do cliente. Consulte a [documentação do Vite sobre env variables](https://vitejs.dev/guide/env-and-mode.html) para mais detalhes.

#### Detalhamento

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API REST do back-end. Em desenvolvimento, aponta para `localhost`. Em produção, aponta para a URL do deploy do back-end. | `http://localhost:8000` |

#### Variáveis de ambiente no deploy em nuvem

Ao fazer o deploy na Vercel (ou em outra plataforma), configure essas mesmas variáveis diretamente no painel da plataforma — elas substituem o arquivo `.env` local no ambiente de produção. Veja a seção [🌐 Hospedagem e Deploy](#-hospedagem-e-deploy) para mais detalhes.

---

## 🌐 Hospedagem e Deploy

> ⚠️ **A hospedagem e o processo de deploy não estão padronizados nem definidos de forma fixa para este projeto.** Sinta-se à vontade para escolher a plataforma que melhor se adaptar à sua realidade.

### Situação Atual

Para esta primeira versão, o deploy foi realizado na **Vercel** por praticidade e facilidade de configuração com projetos Vite/React.

No entanto, a conta utilizada é do plano gratuito, o que **não permite compartilhar acesso ao projeto da Vercel com outros colaboradores**. Por isso, você precisará configurar o seu próprio ambiente de deploy, seja na Vercel ou em qualquer outra plataforma de sua preferência.

Para configurar o deploy do projeto em uma nova conta ou projeto da Vercel, siga a documentação oficial:

📚 **Docs da Vercel:** https://vercel.com/docs

### ⚠️ Pontos importantes antes de fazer o deploy


 Pontos importantes antes de fazer o deploy

> ⚠️ **CAUTION:** Para que a aplicação fique pública e acessível, você precisa hospedar ambos os repositórios (front-end e back-end) em uma plataforma de deploy.


Ao configurar o deploy do front-end, leve em consideração:

**Variáveis de ambiente na Vercel:**

Para que o front-end consiga se comunicar com a API do back-end em produção, é obrigatório configurar a variável `VITE_API_URL` no painel da Vercel (ou da plataforma escolhida), apontando para a URL pública do deploy do back-end.

| Variável | Valor em produção |
|---|---|
| `VITE_API_URL` | `https://url-do-seu-backend-na-vercel.vercel.app` |

No painel da Vercel, acesse: **Settings → Environment Variables** e adicione a variável acima.


**Projetos separados:**

O front-end e o back-end são deployados como **projetos independentes** na Vercel (ou na plataforma escolhida). Cada um tem seu próprio domínio/URL, variáveis de ambiente e configurações de build. A comunicação entre eles é feita via HTTP (API REST), utilizando a variável `VITE_API_URL`.

---

## 🤝 Boas Práticas 

### Padrão de Nomenclatura de Branches

Para manter o repositório organizado e facilitar o rastreamento de mudanças, utilize o seguinte padrão ao criar branches:

| Prefixo | Quando usar | Exemplo |
|---|---|---|
| `feature/` | Desenvolvimento de uma **nova funcionalidade** | `feature/tela-de-relatorios` |
| `bugfix/` | Correção de um **bug** identificado | `bugfix/corrige-filtro-dashboard` |
| `hotfix/` | Correção **urgente** em produção | `hotfix/erro-login-producao` |
| `docs/` | Alterações exclusivas na **documentação** | `docs/atualiza-readme` |
| `refactor/` | **Melhoria de código** sem alterar comportamento | `refactor/otimiza-chamadas-api` |
| `chore/` | Tarefas de **manutenção** (configs, deps, CI) | `chore/atualiza-dependencias` |

**Exemplo de fluxo completo:**

```bash
# 1. Certifique-se de estar na branch principal atualizada
git checkout main
git pull origin main

# 2. Crie uma nova branch a partir da main
git checkout -b feature/nova-funcionalidade

# 3. Faça suas alterações e commits
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# 4. Envie a branch para o repositório remoto
git push origin feature/nova-funcionalidade

```

---

### 📝 Conventional Commits

Este projeto adota o padrão **[Conventional Commits](https://www.conventionalcommits.org/)** para manter um histórico de commits limpo, padronizado e legível.

O Conventional Commits é uma convenção de nomenclatura para mensagens de commit que segue um formato estruturado. Ele facilita a leitura do histórico do repositório, a geração automática de changelogs e a compreensão rápida do tipo de alteração feita em cada commit. Adotamos esse padrão para que qualquer colaborador — atual ou futuro — consiga entender a evolução do projeto apenas lendo as mensagens de commit, sem precisar abrir cada alteração individualmente.

**Todos os commits devem seguir o formato:**

```
<tipo>: <descrição curta e objetiva>
```

### Tipos obrigatórios e exemplos práticos:

| Tipo | Descrição | Exemplo |
|---|---|---|
| ✨ `feat:` | **Nova funcionalidade** adicionada ao projeto | `feat: adiciona nova tela de login` |
| 🐛 `fix:` | **Correção de bug** ou comportamento inesperado | `fix: corrige o erro 500 ao enviar formulário` |
| 📝 `docs:` | Alteração exclusivamente na **documentação** | `docs: atualiza o arquivo README` |
| ♻️ `refactor:` | **Melhoria de código** sem alterar o comportamento externo | `refactor: altera nome da função de busca` |

### Outros tipos aceitos:

| Tipo | Descrição | Exemplo |
|---|---|---|
| 🎨 `style:` | Formatação, espaçamento, etc. (sem alteração de lógica) | `style: ajusta espaçamento do header` |
| ✅ `test:` | Adição ou correção de testes | `test: adiciona teste para componente Login` |
| 🔧 `chore:` | Tarefas de manutenção e configuração | `chore: atualiza dependências do projeto` |
| ⚡ `perf:` | Melhoria de performance | `perf: otimiza re-render do dashboard` |

**Exemplos completos no terminal:**

```bash
# Nova funcionalidade
git commit -m "feat: adiciona painel de exportação PDF"

# Correção de bug
git commit -m "fix: corrige filtro que não atualiza gráficos"

# Documentação
git commit -m "docs: documenta componentes de UI no README"

# Refatoração
git commit -m "refactor: extrai lógica de filtros para custom hook"
```

---
