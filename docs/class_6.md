# Aula 6 - Domain Driven Design & Event Driven Architecture

## Modelagem Estratégica

No **Domain Driven Design (DDD)**, o domínio de um sistema é dividido em subdomínios para facilitar o entendimento, a comunicação e a organização do negócio.

- **Subdomínio:** Área específica de conhecimento ou atividade dentro do domínio principal, com regras e objetivos próprios.

### Tipos de Subdomínios

- **Core Domain (Domínio Principal):** Núcleo do negócio, onde está o maior diferencial competitivo e valor para a empresa. Deve receber maior atenção e investimento.
- **Support/Auxiliary Domain (Domínio de Suporte/Auxiliar):** Dá suporte ao Core Domain, oferecendo funcionalidades complementares essenciais ao funcionamento do negócio.
- **Generic Domain (Domínio Genérico):** Abrange funcionalidades comuns e reutilizáveis, que podem ser terceirizadas ou adquiridas como soluções prontas.

#### Exemplos em um E-commerce

- **Core Domain:** Gestão de pedidos, processamento de pagamentos, experiência de compra do cliente.
- **Support/Auxiliary Domain:** Atendimento ao cliente, logística de entrega, marketing.
- **Generic Domain:** Autenticação de usuários, envio de e-mails, ferramentas de analytics.

> **Dica:** Sempre que possível, utilize soluções prontas para domínios genéricos. Assim, você evita reinventar a roda e pode focar esforços no que realmente diferencia o seu negócio.

---

## Bounded Context

Um **Bounded Context** define um limite explícito dentro do qual um modelo de domínio específico é válido. Ele garante que termos, regras e lógicas tenham significado claro e consistente naquele contexto. Cada subdomínio pode ser implementado em um ou mais bounded contexts, promovendo autonomia e clareza.

---

## Shared Kernel

O **Shared Kernel** é uma pequena parte do modelo de domínio compartilhada entre dois ou mais bounded contexts. Para utilizá-lo de forma eficaz:

- Defina claramente quais elementos do modelo serão compartilhados.
- Documente detalhadamente as regras de uso e integração.
- Estabeleça processos de comunicação entre as equipes para evitar conflitos e manter a integridade do kernel compartilhado.

---

## Anticorruption Layer

A **Anticorruption Layer (ACL)** é uma camada de proteção utilizada quando um bounded context precisa interagir com outro contexto ou sistema externo. Ela serve para:

- Isolar o modelo interno de influências externas.
- Traduzir e adaptar dados e comportamentos entre contextos.
- Proteger o modelo interno contra mudanças ou inconsistências externas.

---

Esses conceitos promovem sistemas mais organizados, flexíveis e alinhados ao negócio, facilitando a manutenção e evolução do software.

---

## Arquitetura de Microserviços

**Livro recomendado:** _Microservices Patterns_

### Objetivos da Arquitetura de Microserviços

- Serviços independentes e desacoplados, formando uma arquitetura distribuída, escalável e resiliente.
- Cada microserviço é responsável por um conjunto específico de responsabilidades e pode se comunicar de forma síncrona ou assíncrona com outros serviços.
- Permite que equipes diferentes trabalhem de forma autônoma, reduzindo conflitos e aumentando a produtividade.

### Características Principais

- **Independência:** Cada serviço pode ser desenvolvido, implantado e escalado de forma isolada.
- **Distribuição:** Os serviços são executados em ambientes separados, podendo estar em diferentes servidores ou regiões.
- **Escalabilidade:** É possível aumentar a capacidade apenas dos serviços necessários, otimizando recursos.
- **Resiliência:** Falhas em um serviço não comprometem todo o sistema, permitindo maior tolerância a falhas.

### Acoplamento Síncrono

- Pode gerar latência devido à comunicação pela rede e ao tempo de resposta elevado.
- Aumenta o consumo de memória, pois dados precisam ser mantidos enquanto se aguarda respostas.
- A infraestrutura precisa ser dimensionada para suportar picos de utilização.
- Se um serviço falhar, pode comprometer independência, escalabilidade e resiliência.

---

## Otimizações Locais

- **Servir recursos estáticos por CDN:** Reduz latência e melhora a experiência do usuário.
- **Queries lentas:** Identifique e otimize consultas ao banco de dados.
- **Partial response:** Retorne apenas os dados necessários para cada requisição.
- **Cache:** Utilize cache para armazenar dados frequentemente acessados e reduzir carga no sistema.

A infraestrutura escolhida impacta diretamente no desempenho, escalabilidade e custo do sistema.

---

## Tipos de Infraestrutura

- **SaaS (Software as a Service):** Software pronto, acessado via internet, sem necessidade de instalação ou manutenção local.
- **FaaS (Function as a Service):** Execução de funções sob demanda, sem gerenciar servidores (ex: AWS Lambda).
- **PaaS (Platform as a Service):** Plataforma gerenciada para desenvolvimento, execução e gerenciamento de aplicações (ex: Heroku, Google App Engine).
- **CaaS (Container as a Service):** Gerenciamento de containers como serviço, facilitando a implantação e escalabilidade (ex: Kubernetes, AWS ECS).
- **IaaS (Infrastructure as a Service):** Infraestrutura virtualizada sob demanda, como servidores, redes e armazenamento (ex: AWS EC2, Azure VM).
- **On-Premise:** Infraestrutura física própria, instalada e mantida localmente pela empresa.

---

Esses conceitos e práticas são fundamentais para criar sistemas robustos, escaláveis e alinhados às necessidades do negócio.

> **Nota:** VM (Máquina Virtual) e Container são tecnologias diferentes, cada uma com seus próprios casos de uso e benefícios.

---

## Event Driven Architecture

A **Arquitetura Orientada a Eventos** é uma abordagem ideal para transações distribuídas em ambientes de microserviços, promovendo baixo acoplamento, comunicação assíncrona e eliminando a necessidade de um orquestrador central.

### O que é um evento?

Um evento representa um fato relevante que ocorreu no domínio e pode servir como gatilho para a execução de regras de negócio.

A fila de eventos atua como um *buffer*, permitindo que os serviços processem mensagens no seu próprio ritmo, de acordo com os recursos disponíveis. Isso possibilita que serviços fiquem temporariamente fora do ar e se recuperem de falhas sem perda de dados.

### Como lidar com carga excessiva?

- **Mensageria:** Utilizar sistemas de mensageria para desacoplar produtores e consumidores, absorvendo picos de carga e garantindo resiliência.

### Diferença entre fila de mensageria e fila de jobs

- **Fila de Mensageria:** Focada em comunicação entre serviços, transmitindo eventos ou mensagens.
- **Fila de Jobs:** Voltada para processamento de tarefas assíncronas, como execução de trabalhos em background.

### Benefícios da Assincronicidade

- Reduz o custo de infraestrutura, pois permite o escalonamento conforme a demanda.
- Exemplo: Geração de relatórios pode ser feita de forma assíncrona, liberando recursos para outras operações.

### Fluxo de Eventos

```
Producer --> Event Broker (Queue) --> Consumer
```

**Exemplos de brokers:** RabbitMQ, Kafka

---

Esses conceitos são essenciais para construir sistemas modernos, resilientes e preparados para crescer conforme as necessidades do negócio evoluem.