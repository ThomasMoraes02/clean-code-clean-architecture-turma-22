# Clean Code & Clean Architecture (Turma 22)

Projeto do curso ministrado por Rodrigo Branas, focado em Clean Code e Clean Architecture, com exemplos práticos em Node.js, TypeScript, Vue.js, Docker e testes automatizados.

---

## Autor

**Thomas Vinicius de Moraes**

---

## Stack Utilizada

- **Node.js** (>= 20.19.0)
- **npm** (>= 9.x)
- **TypeScript** (backend e frontend)
- **Express** (backend)
- **Vue 3 + Vite** (frontend)
- **Jest** (testes backend)
- **Vitest** (testes frontend)
- **Playwright** (testes end-to-end)
- **Docker & Docker Compose**
- **PostgreSQL** (banco de dados)
- **RabbitMQ** (mensageria)

---

## Estrutura dos Diretórios

- `backend/` — Código-fonte do backend (Node.js + TypeScript)
  - `src/` — Implementação principal
  - `test/` — Testes unitários e de integração (Jest)
  - `coverage/` — Relatórios de cobertura de testes
- `frontend/vue/` — Frontend em Vue 3 + Vite
  - `src/` — Código-fonte do frontend
  - `__tests__/` — Testes unitários (Vitest)
- `e2e/` — Testes end-to-end (Playwright)
  - `tests/` — Especificações E2E
- `database/` — Scripts SQL para criação e estrutura do banco
- `docker/` — Dockerfile e docker-compose para orquestração dos serviços
- `docs/` — Documentação e anotações do curso

---

## Comandos Úteis

### Docker

- Subir todos os serviços (backend, banco, etc):
  ```sh
  npm run docker:compose:up
  ```
- Parar e remover containers:
  ```sh
  npm run docker:compose:down
  ```
- Acessar o container do backend:
  ```sh
  npm run docker:compose:exec
  ```
- Subir apenas o banco de dados:
  ```sh
  npm run docker:compose:db:up
  ```
- Parar e remover apenas o banco:
  ```sh
  npm run docker:compose:db:down
  ```

### Backend

- Instalar dependências:
  ```sh
  cd backend && npm install
  ```
- Rodar testes (dentro do container backend):
  ```sh
  npx jest
  ```
- Gerar configuração do Jest:
  ```sh
  npx ts-jest config:init
  ```
- Compilar TypeScript:
  ```sh
  npx tsc
  ```

### Frontend

- Instalar dependências:
  ```sh
  cd frontend/vue && npm install
  ```
- Rodar o servidor de desenvolvimento:
  ```sh
  npm run dev
  ```
- Rodar testes unitários:
  ```sh
  npm run test:unit
  ```

### E2E (Playwright)

- Instalar dependências:
  ```sh
  cd e2e && npm install
  ```
- Rodar testes E2E:
  ```sh
  npx playwright test
  ```
- Gerar relatório HTML dos testes:
  ```sh
  npx playwright show-report
  ```

---

## Requisitos

- Node.js >= 20.19.0
- npm >= 9.x
- Docker e Docker Compose

---

## Observações

- Os testes do backend devem ser executados **dentro do container** para garantir o ambiente correto.
- O banco de dados é inicializado automaticamente via Docker Compose, usando os scripts em `database/`.
- O frontend utiliza Vite para hot reload e build otimizado.
- O projeto segue princípios de Clean Code e Clean Architecture, com exemplos e anotações em `docs/`.

---

## Licença

Projeto educacional para fins de estudo no curso do Branas.
