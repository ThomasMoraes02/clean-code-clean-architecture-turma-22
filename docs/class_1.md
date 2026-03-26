# Aula 1 - Clean Code & Clean Architecture (Turma 22)

Bem-vindo ao arquivo de anotações da **Aula 1** do curso de Clean Code & Clean Architecture.

## Tópicos abordados

- Introdução ao curso
- O que é Clean Code?
- Princípios fundamentais de código limpo
- Introdução à Clean Architecture
- Exemplos práticos e discussões

## Anotações

- npx ts-jest config:init = gera o jest.config.ts
- devContainer: 

---

> _Este arquivo é destinado ao registro das principais ideias, conceitos e dúvidas surgidas durante a aula._

## Tecnologias Utilizadas

### TypeScript/JavaScript
- **O que é:** JavaScript é uma linguagem de programação amplamente utilizada para desenvolvimento web. TypeScript é um superset do JavaScript que adiciona tipagem estática.
- **Objetivo:** Permitir o desenvolvimento de aplicações web dinâmicas e robustas, com maior segurança e produtividade ao usar TypeScript.

### Node.js
- **O que é:** Ambiente de execução para JavaScript no lado do servidor.
- **Objetivo:** Permitir a criação de aplicações backend escaláveis utilizando JavaScript.

### React
- **O que é:** Biblioteca JavaScript para construção de interfaces de usuário (UI) reativas.
- **Objetivo:** Facilitar o desenvolvimento de interfaces web modernas, componíveis e eficientes.

### Vue
- **O que é:** Framework progressivo para construção de interfaces de usuário.
- **Objetivo:** Proporcionar uma abordagem flexível e incremental para o desenvolvimento de UIs interativas.

### Docker
- **O que é:** Plataforma para criação, execução e gerenciamento de containers.
- **Objetivo:** Garantir portabilidade, isolamento e facilidade de deploy de aplicações em diferentes ambientes.

### PostgreSQL
- **O que é:** Sistema gerenciador de banco de dados relacional open source.
- **Objetivo:** Armazenar, consultar e gerenciar dados de forma segura, confiável e eficiente.

### RabbitMQ
- **O que é:** Sistema de mensageria open source baseado em filas.
- **Objetivo:** Facilitar a comunicação assíncrona e desacoplada entre diferentes partes de uma aplicação.

---

### Test Driven Development
- Os testes automatizados são a **única forma** que temos de garantir que o código funciona e continuará funcionando. 

- Os testes manuais são importantes principalmente para aceitação por parte dos usuários, de usabilidade e acessibilidade, mas cuidado, esses testes não garantem que não existirá a regressão ao longo do tempo, sempre que o código mudar. 

- Ter 100% de cobertura **não é garantia de que não vão existir defeitos.**

*O que é teste automatizado?*
- **Given/Arrange:** Definicão de todas as informações necessárias para executar o comportamento que será testado.

- **When/Act:** Executar o comportamento

- **Then/Assert:** Verificar o que aconteceu após a execução, comparando as informações retornadas com a expectativa que foi criada. 

### First
- *FAST*: Os testes devem rodar rápido.
- *Independent*: Não deve existir dependência entre os testes, eles devem poder ser executados de maneira isolada.
- *Repeatable*: O resultado deve ser o mesmo independente da quantidade de vezes que seja executado.
- *Self-validating*: O próprio teste deve ter uma saída bem definida que é válida ou não fazendo com que ele passe ou falhe.
- *Timely*: Os testes devem ser escritos antes do código-fonte.

### Como funciona o TDD
- É um método para construir software, não para testá-lo
- RED -> Geen -> Refactor

*BDD: Behavior Driven Development:*
- **O que é?**  
    BDD (Behavior Driven Development) é uma abordagem de desenvolvimento de software que estende o TDD, focando na descrição do comportamento do sistema do ponto de vista do usuário ou do negócio. Os requisitos são escritos em uma linguagem comum, facilitando a comunicação entre desenvolvedores, testadores e stakeholders.

### Refactoring
- *Deve sempre existir um comportamento entre comportamento e estrutura*
- *Alteração feita na estrutura interna do software para torná-lo mais fácil de ser entendido e menos custoso de ser modificado, sem alterar o seu comportamento observável*
- É um investimento, torna o software sustentável e competitivo.
- Refatore quando precisar entender uma parte do código

### Reconhecendo os Code Smells e aplicando técnicas de refactoring
1. *Nomes estranhos* de variáveis métodos e classes
2. *Excesso de ruído*: 
- Comentários desnecessários - quando o código não é claro o suficiente. 
- Código morto: código comentado sem necessidade. 
- Linha em branco: espaços sem necessidade
- Condições confusas: ifs aninhados


*Porque extrair em funções?*
1. Caber na tela;
2. Reúso;
3. Testar isoladamente
4. Auto explicativo