# 📂 Estrutura de Diretórios do Projeto

---

## Visão Geral da Árvore

```
indicadores-extensao-front/
├── dist/
├── node_modules/
├── public/
│   ├── IconUnipampa.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── gifs/
│   │   ├── LogoHome.png
│   │   ├── HomeIllustration.png
│   │   └── ... (imagens e SVGs)
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Upload.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ... (demais componentes)
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── css/
│   │   ├── Dashboard.css
│   │   ├── Home.css
│   │   ├── Login.css
│   │   └── ... (1 arquivo CSS por componente)
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── ...
```

---

## 📁 `/dist`

**O que é:** Pasta de saída gerada automaticamente pelo comando `npm run build`. Contém a versão final, compilada, minificada e otimizada da aplicação, pronta para ser servida em um servidor web de produção (deploy).

---

## 📁 `/node_modules`

**O que é:** Diretório gerenciado exclusivamente pelo `npm`. Armazena todas as bibliotecas e dependências (e suas sub-dependências) listadas no `package.json` após a execução de `npm install`.
.
---

---

## 📁 `/src`

**O que é:** Diretório principal e mais importante do projeto. Concentra **todo o código-fonte** da aplicação React: componentes, estilos, serviços, contextos e recursos visuais. É aqui que o desenvolvimento acontece no dia a dia.

**Arquivos na raiz de `/src`:**

| Arquivo | Descrição |
| :--- | :--- |
| `main.tsx` | Ponto de entrada da aplicação. Monta o React no DOM e configura os providers (Router, Context, etc.). |
| `App.tsx` | Componente raiz que define o layout geral e as rotas da aplicação via React Router. |
| `App.css` | Estilos globais aplicados diretamente ao componente `App`. |
| `index.css` | Estilos globais base (reset CSS, fontes, variáveis CSS do projeto). |
| `types.ts` | Definições de tipos TypeScript compartilhados entre múltiplos módulos. |

---

## 📁 `/src/assets`

**O que é:** Armazena todos os recursos visuais estáticos que são **importados diretamente** dentro de componentes React (via `import`). Diferente de `/public`, estes arquivos passam pelo pipeline do Vite, recebendo hashing no nome para cache e otimização.

**Conteúdo atual:** Logos do sistema (`LogoHome.png`, `LogoProec.png`), ilustrações das páginas, ícones de navegação (setas), fotos de apresentação e uma subpasta `gifs/` para animações.

**Quando usar:** Sempre que precisar de uma imagem, ícone SVG ou GIF que será utilizado diretamente num componente via `import`, adicione aqui. Organize em subpastas se necessário (ex.: `assets/icons/`, `assets/photos/`).

---

## 📁 `/src/components`

**O que é:** Contém **todos os componentes React** (`.tsx`) da aplicação. Cada arquivo representa uma unidade funcional da interface — desde páginas inteiras até componentes reutilizáveis menores.

**Componentes presentes:**

| Componente | Tipo | Descrição |
| :--- | :--- | :--- |
| `Home.tsx` | Página | Tela inicial / landing page do sistema. |
| `Login.tsx` | Página | Formulário de autenticação de usuário. |
| `Dashboard.tsx` | Página | Painel principal com gráficos e indicadores. |
| `Upload.tsx` | Página | Interface de upload de arquivos CSV de dados. |
| `Sobre.tsx` | Página | Página institucional "Sobre" o projeto. |
| `Ajuda.tsx` | Página | Seção de ajuda e FAQ para o usuário. |
| `Navbar.tsx` | UI | Barra de navegação superior do sistema. |
| `Footer.tsx` | UI | Rodapé global da aplicação. |
| `ChartComponents.tsx` | UI | Componentes de renderização de gráficos (Recharts). |
| `SkeletonComponents.tsx` | UI | Placeholders de carregamento (skeleton loaders). |
| `filter.tsx` | UI | Componente de filtros de dados do dashboard. |
| `LeftInfoGraphs.tsx` | UI | Painel informativo à esquerda dos gráficos. |
| `RightInfoGraphs.tsx` | UI | Painel informativo à direita dos gráficos. |
| `Accordion.tsx` | UI | Container de accordion (usado na página de Ajuda). |
| `AccordionItem.tsx` | UI | Item individual dentro do accordion. |
| `Tooltip.tsx` | UI | Componente de tooltip reutilizável. |
| `PrivateRoute.tsx` | Rota | Wrapper de proteção para rotas autenticadas. |

**Quando usar:** Ao criar uma nova tela ou componente visual, crie um arquivo `.tsx` aqui e o respectivo arquivo `.css` na pasta `/src/css/`.

---

## 📁 `/src/contexts`

**O que é:** Armazena os **React Contexts** da aplicação — mecanismo nativo do React para compartilhar estado global entre componentes sem a necessidade de prop drilling (passar props por vários níveis).

**Conteúdo atual:**

| Arquivo | Descrição |
| :--- | :--- |
| `AuthContext.tsx` | Gerencia o estado de autenticação do usuário (login, logout, token, dados do usuário logado). Disponibiliza essas informações para toda a árvore de componentes. |

**Quando usar:** Se precisar compartilhar um estado global novo (ex.: tema da aplicação, dados gerais de configuração), crie um novo arquivo `NomeContext.tsx` nesta pasta seguindo o mesmo padrão do `AuthContext.tsx`.

---

## 📁 `/src/css`

**O que é:** Centraliza **todos os arquivos de estilo CSS** da aplicação. O projeto segue uma convenção de **1 arquivo CSS por componente**, onde o nome do arquivo CSS corresponde ao nome do componente que ele estiliza.

**Exemplo de correspondência:**

| Componente (`/components`) | Estilo (`/css`) |
| :--- | :--- |
| `Dashboard.tsx` | `Dashboard.css` |
| `Home.tsx` | `Home.css` |
| `Login.tsx` | `Login.css` |
| `Upload.tsx` | `Upload.css` |
| `Navbar.tsx` | `Navbar.css` |
| `Footer.tsx` | `Footer.css` |
| `Sobre.tsx` | `Sobre.css` |
| `Ajuda.tsx` | `Ajuda.css` |

**Quando usar:** Ao criar um novo componente em `/components`, crie obrigatoriamente o arquivo CSS correspondente aqui com o mesmo nome (ex.: `MeuComponente.tsx` → `MeuComponente.css`). Importe-o no componente com `import '../css/MeuComponente.css'`.

---

## 📁 `/src/services`

**O que é:** Camada de **comunicação com o backend**. Contém os módulos responsáveis por configurar e realizar chamadas HTTP (via Axios) para a API REST do servidor.

**Conteúdo atual:**

| Arquivo | Descrição |
| :--- | :--- |
| `api.ts` | Configuração central do Axios (base URL, interceptors) e todas as funções de chamada à API (endpoints de dados, upload, indicadores, etc.). |
| `auth.ts` | Funções específicas de autenticação (login, verificação de token, registro). |

**Quando usar:** Se precisar consumir um novo endpoint do backend, adicione a função correspondente em `api.ts`. Se for um serviço com responsabilidade distinta e extensa (ex.: relatórios, notificações), crie um novo arquivo `nomeDoServico.ts` nesta pasta.

---

## Resumo Rápido — Onde colocar cada coisa?

| Preciso criar... | Coloque em... |
| :--- | :--- |
| Uma nova página ou componente visual | `/src/components/NomeComponente.tsx` |
| O estilo CSS correspondente | `/src/css/NomeComponente.css` |
| Uma nova chamada para API do backend | `/src/services/api.ts` (ou novo arquivo `.ts`) |
| Um estado global compartilhado (Context) | `/src/contexts/NomeContext.tsx` |
| Uma imagem/logo usada em componentes | `/src/assets/` |
| Um favicon ou arquivo estático público | `/public/` |
| Um tipo TypeScript reutilizável | `/src/types.ts` |
