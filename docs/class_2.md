# Aula 2 - Tipos de Testes Automatizados (E2E, Integration, Unit), Arquitetura Hexagonal

### O que é a Pirâmide de Testes?

A pirâmide de testes é um modelo que orienta como distribuir os diferentes tipos de testes automatizados em um projeto, equilibrando qualidade, velocidade e custo de manutenção. Ela sugere que a maior parte dos testes deve ser composta por testes unitários, seguidos por testes de integração e, por fim, uma menor quantidade de testes end-to-end (E2E).

#### **Unit (Unidade) — Base da Pirâmide**
- Testes rápidos, baratos e confiáveis.
- Validam funções, métodos ou classes de forma isolada, sem dependências externas.
- Facilitam identificar rapidamente onde está um erro no código.

#### **Integration (Integração) — Meio da Pirâmide**
- Avaliam a comunicação entre diferentes módulos, serviços ou camadas do sistema.
- Costumam envolver recursos externos, como bancos de dados ou APIs.
- São mais lentos e podem ser menos estáveis devido à dependência de I/O.

#### **E2E (End-to-End) — Topo da Pirâmide**
- Simulam o comportamento do usuário final, testando o sistema de ponta a ponta.
- Envolvem todas as camadas: frontend, backend e banco de dados.
- São mais custosos e lentos, mas essenciais para garantir que os fluxos principais funcionam como esperado.

---

**Exemplo de Estrutura de Diretórios:**
- `frontend/`: código do frontend (ex: Vue.js) e testes de integração com o backend.
- `e2e/`: testes end-to-end, simulando interações reais do usuário.

**Ferramenta recomendada:**  
[Playwright](https://playwright.dev/) — Ferramenta moderna para automação de navegadores, ideal para testes E2E. Permite simular interações reais do usuário em múltiplos navegadores, garantindo que a aplicação funcione corretamente do ponto de vista do usuário final.

---

### Arquitetura Hexagonal (Ports and Adapters)

A Arquitetura Hexagonal, proposta por Alistair Cockburn, é um padrão de design que separa o núcleo da aplicação (domínio) das suas dependências externas (como bancos de dados, interfaces de usuário, APIs externas). Essa separação é feita por meio de portas (ports) e adaptadores (adapters):

- **Ports:** Interfaces que definem como o núcleo da aplicação se comunica com o mundo externo.
- **Adapters:** Implementações concretas dessas interfaces, conectando o domínio a recursos externos.

**Driver:** Um driver é qualquer componente externo que interage com a aplicação através das portas, como um usuário, um sistema externo ou um teste automatizado.

A arquitetura hexagonal facilita testes, manutenção e evolução do sistema, pois o núcleo da aplicação não depende diretamente de detalhes de infraestrutura.

> **Resumo:** Toda decisão de design impacta a arquitetura. Arquitetura é o conjunto de decisões que restringem e orientam o design do sistema.

---

### SOLID

Princípios SOLID são um conjunto de boas práticas para design de software orientado a objetos, facilitando manutenção, extensibilidade e testabilidade do código.

---

### Livro: Patterns of Enterprise Application Architecture

Livro de Martin Fowler que cataloga padrões arquiteturais comuns em aplicações corporativas, como Repository, Service Layer, Data Mapper, entre outros. Serve como referência para estruturar sistemas complexos e reutilizáveis.

---

### Aplicação: Contratos

Exemplo prático: implementação de contratos em memória, sem dependência de recursos externos, facilita testes unitários e integração, além de promover desacoplamento e flexibilidade na arquitetura.