# 📊 Indicadores de Extensão — Front-end

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.36-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

</div>

---

## 📝 Descrição do Projeto

O **Indicadores de Extensão** é uma aplicação web desenvolvida para a **visualização e análise de indicadores de projetos de extensão universitária**. 

### ✨ Principais funcionalidades

- 🏠 **Página inicial (Home)** — Apresentação institucional do sistema com visão geral do projeto.
- 📊 **Dashboard de indicadores** — Painel interativo com gráficos e filtros para análise dos dados de extensão.
- 📤 **Upload de dados** — Interface para importação de planilhas CSV com dados dos projetos (rota protegida).
- 🔐 **Autenticação** — Sistema de login para controle de acesso às funcionalidades administrativas.
- ℹ️ **Sobre** — Página institucional com informações sobre o projeto e a equipe.
- ❓ **Ajuda** — Seção de perguntas frequentes (FAQ) com componentes de accordion.

---

## 🗂️ Estrutura Geral do Projeto

Abaixo está a árvore de diretórios do repositório com a finalidade de cada pasta e arquivo principal:

```
indicadores-extensao-front/
├── public/                   # Arquivos estáticos públicos
│   ├── IconUnipampa.png      # Favicon / ícone da universidade
│   └── vite.svg              # Ícone padrão do Vite
├── src/                      # Código-fonte principal da aplicação
│   ├── assets/               # Recursos visuais (imagens, SVGs, GIFs)
│   ├── components/           # Componentes React (.tsx)
│   ├── contexts/             # React Contexts (estado global)
│   ├── css/                  # Arquivos de estilo CSS por componente
│   ├── services/             # Camada de comunicação com a API (Axios)
│   ├── App.tsx               # Componente raiz — layout e rotas
│   ├── App.css               # Estilos globais do componente App
│   ├── main.tsx              # Ponto de entrada — monta o React no DOM
│   ├── index.css             # Reset CSS e variáveis globais
│   └── types.ts              # Tipos TypeScript compartilhados
├── dist/                     # Build de produção (gerado automaticamente)
├── .env                      # Variáveis de ambiente
├── index.html                # HTML raiz servido pelo Vite
├── package.json              # Dependências e scripts do projeto
├── vite.config.ts            # Configuração do bundler Vite
├── eslint.config.js          # Configuração do linter ESLint
├── tsconfig.json             # Configuração base do TypeScript
├── tsconfig.app.json         # Configuração TS para o código da aplicação
└── tsconfig.node.json        # Configuração TS para scripts Node
```

### 📁 Detalhamento dos diretórios

| Diretório | Finalidade |
| :--- | :--- |
| `public/` | Arquivos servidos diretamente sem processamento do Vite (favicons, ícones públicos). |
| `src/assets/` | Imagens, logos, ilustrações e GIFs **importados** nos componentes — passam pelo pipeline do Vite e recebem hashing para otimização de cache. |
| `src/components/` | Todos os componentes React (`.tsx`) da aplicação — desde páginas inteiras até componentes de UI reutilizáveis. |
| `src/contexts/` | React Contexts para gerenciamento de estado global (ex: autenticação). |
| `src/css/` | Arquivos CSS organizados por componente, seguindo a convenção **1 arquivo CSS por componente**. |
| `src/services/` | Camada de serviços com configuração do Axios e funções de chamada à API REST. |
| `dist/` | Pasta de saída gerada pelo `npm run build` — versão compilada e otimizada para produção. |

### 📄 Arquivos de configuração

| Arquivo | Finalidade |
| :--- | :--- |
| `vite.config.ts` | Configura o Vite como bundler com o plugin `@vitejs/plugin-react` para suporte ao React. |
| `eslint.config.js` | Define as regras de linting com suporte a TypeScript, React Hooks e React Refresh. |
| `tsconfig.json` | Configuração raiz do TypeScript que referencia os demais arquivos de configuração. |
| `package.json` | Lista de dependências, scripts (`dev`, `build`, `lint`, `preview`) e metadados do projeto. |
| `.env` | Variáveis de ambiente (ex: URL base da API). **Não deve ser commitado com dados sensíveis.** |

---

## Arquitetura de Componentes

O projeto segue uma arquitetura organizada em **camadas de responsabilidade**, separando claramente visualização, lógica de estado e comunicação com o backend.

### Fluxo da aplicação

```
main.tsx → App.tsx → Router → Páginas → Componentes de UI
                        ↑                       ↓
                   AuthContext            Services (API)
```

### Camadas do projeto

| Camada | Diretório | Responsabilidade |
| :--- | :--- | :--- |
| **Entrada** | `main.tsx` | Inicializa o React, renderiza o `<App />` e configura providers globais (StrictMode, ToastContainer). |
| **Roteamento** | `App.tsx` | Define todas as rotas da aplicação via React Router, aplica o layout global (Navbar) e envolve a árvore com o `AuthProvider`. |
| **Páginas** | `components/` | Componentes de página (`Home`, `Dashboard`, `Login`, `Upload`, `Sobre`, `Ajuda`) que representam telas completas da aplicação. |
| **UI** | `components/` | Componentes reutilizáveis de interface (`Navbar`, `Footer`, `Tooltip`, `Accordion`, `ChartComponents`, `SkeletonComponents`, `filter`). |
| **Estado Global** | `contexts/` | Gerenciamento de estado via React Context API — atualmente o `AuthContext` controla autenticação, token e dados do usuário logado. |
| **Serviços** | `services/` | Abstração da comunicação HTTP com o backend via Axios (`api.ts` para endpoints de dados e `auth.ts` para autenticação). |
| **Estilos** | `css/` | CSS modular — cada componente possui seu próprio arquivo de estilo correspondente. |
| **Proteção de Rotas** | `PrivateRoute.tsx` | Wrapper que protege rotas autenticadas, redirecionando usuários não logados. |

###  Organização dos componentes

Os componentes estão divididos em dois grupos principais:

**Componentes de Página** — representam telas inteiras acessíveis por rota:

| Componente | Rota | Descrição |
| :--- | :--- | :--- |
| `Home.tsx` | `/` | Página inicial / landing page do sistema. |
| `Dashboard.tsx` | `/dashboard` | Painel com gráficos interativos e indicadores. |
| `Login.tsx` | `/login` | Formulário de autenticação. |
| `Upload.tsx` | `/upload` | Interface de upload de CSV (rota protegida). |
| `Sobre.tsx` | `/sobre` | Página institucional sobre o projeto. |
| `Ajuda.tsx` | `/ajuda` | Seção de FAQ com accordion. |

**Componentes de UI** — elementos reutilizáveis que compõem as páginas:

| Componente | Descrição |
| :--- | :--- |
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

## Tecnologias e Bibliotecas

### Tecnologias base

| Tecnologia | Versão | Papel no projeto |
| :--- | :--- | :--- |
| ⚛️ **React** | 19.1 | Biblioteca principal para construção da interface com componentes reutilizáveis e gerenciamento de estado reativo. |
| 🟦 **TypeScript** | 5.9 | Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança, autocompletar e detecção de erros em tempo de desenvolvimento. |
| ⚡ **Vite** | 7.1 | Bundler e servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR) para feedback instantâneo durante o desenvolvimento. |
| 🔍 **ESLint** | 9.36 | Ferramenta de análise estática de código que garante a consistência e qualidade do código-fonte por meio de regras configuráveis. |
| 🟢 **Node.js** | — | Ambiente de execução JavaScript necessário para rodar os scripts do projeto (`dev`, `build`, `lint`) e o gerenciador de pacotes `npm`. |

### Bibliotecas principais

| Biblioteca | Papel no projeto |
| :--- | :--- |
| `react-router-dom` | Gerenciamento de rotas e navegação entre páginas (SPA). |
| `axios` | Cliente HTTP para comunicação com a API REST do backend. |
| `recharts` | Biblioteca de gráficos para React, utilizada nos dashboards de indicadores. |
| `react-toastify` / `sonner` | Notificações e toasts para feedback visual ao usuário. |
| `jspdf` + `html2canvas` | Geração de relatórios em PDF a partir dos dashboards e gráficos. |
| `react-text-to-speech` | Recurso de acessibilidade com leitura por voz do conteúdo. |

---

## ⚙️ Configuração e Instalação

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [**Node.js**](https://nodejs.org/) (versão 18 ou superior recomendada)
- [**npm**](https://www.npmjs.com/) (incluso com o Node.js)
- [**Git**](https://git-scm.com/)

### 🔽 Passo a passo para rodar o projeto

**1. Clone o repositório:**


**2. Acesse o diretório do projeto:**

**3. Instale as dependências:**

```bash
npm install
```

**4. Configure as variáveis de ambiente:**

Crie (ou edite) o arquivo `.env` na raiz do projeto com a URL da API:

```bash
# .env
VITE_API_URL=http://localhost:PORTA_DO_BACKEND
```

**5. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

**6. Acesse a aplicação no navegador:**

```
http://localhost:5173
```

### 📜 Scripts disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR. |
| `npm run build` | Compila o TypeScript e gera o build de produção em `/dist`. |
| `npm run lint` | Executa o ESLint para análise estática do código. |
| `npm run preview` | Serve localmente o build de produção para pré-visualização. |

---

## Boas Práticas 

### Padrão de Branches

Para manter o repositório organizado e facilitar o code review, siga o padrão de nomenclatura de branches abaixo:

| Prefixo | Uso | Exemplo |
| :--- | :--- | :--- |
| `feature/` | Nova funcionalidade | `feature/tela-de-relatorios` |
| `bugfix/` | Correção de bug | `bugfix/corrige-filtro-dashboard` |
| `hotfix/` | Correção urgente em produção | `hotfix/erro-login-producao` |
| `docs/` | Alterações na documentação | `docs/atualiza-readme` |
| `refactor/` | Refatoração de código existente | `refactor/otimiza-chamadas-api` |

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

# 5. Abra um Pull Request no GitHub
```

---

### Conventional Commits 


```
<tipo>: <descrição curta e objetiva>
```

#### Tipos obrigatórios e exemplos práticos:

| Tipo | Quando usar | Exemplo |
| :--- | :--- | :--- |
| ✅ `feat` | Nova funcionalidade adicionada ao projeto | `feat: adiciona nova tela de login` |
| 🐛 `fix` | Correção de bug ou comportamento inesperado | `fix: corrige o erro 500 ao enviar formulário` |
| 📚 `docs` | Alteração exclusivamente na documentação | `docs: atualiza o arquivo README` |
| ♻️ `refactor` | Melhoria de código sem alterar comportamento externo | `refactor: altera nome da função de busca` |
| 🎨 `style` | Alterações visuais/formatação (sem lógica) | `style: ajusta espaçamento do header` |
| 🧪 `test` | Adição ou correção de testes | `test: adiciona teste para componente Login` |
| 🔧 `chore` | Tarefas de manutenção e configuração | `chore: atualiza dependências do projeto` |


---
