# Aula 2 - Tipos de Testes Automatizados (E2E, Integration, Unit), Arquitetura Hexagonal

### O que é a Pirâmide de Testes?

A pirâmide de testes é um conceito que orienta a distribuição dos diferentes tipos de testes automatizados em um projeto, visando garantir qualidade com eficiência de tempo e recursos.

#### **Unit (Unidade) — Base da Pirâmide**
- Testes mais rápidos e estáveis.
- Focam em funções, métodos ou classes isoladas.
- Não interagem com recursos externos (APIs, bancos de dados, arquivos).

#### **Integration (Integração) — Meio da Pirâmide**
- Testam a interação entre diferentes componentes ou camadas do sistema.
- Costumam envolver recursos externos.
- São mais lentos e menos estáveis devido ao uso de I/O.

#### **E2E (End-to-End) — Topo da Pirâmide**
- Replicam o ambiente do usuário final, testando o sistema de ponta a ponta.
- Envolvem frontend, backend e banco de dados.
- São mais lentos e custosos, mas essenciais para validar fluxos completos.

---

**Exemplo de Estrutura de Diretórios:**
- `frontend/`: contém o código Vue.js e testes de integração com o backend.
- `e2e/`: dedicado a testes end-to-end.

**Ferramenta recomendada:**  
[Playwright](https://playwright.dev/) — Uma ferramenta de automação de navegador para testes E2E. Permite simular interações reais do usuário em diferentes navegadores, garantindo que o sistema funcione como esperado do ponto de vista do usuário final.