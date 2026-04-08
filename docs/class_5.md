# Aula 5 - Domain Driven Design (DDD)

## Padrão Saga

O padrão Saga é utilizado para gerenciar transações distribuídas em sistemas complexos. Ele divide uma transação longa em uma sequência de pequenas transações locais, cada uma com sua própria lógica de compensação caso algo dê errado. Isso garante consistência eventual sem a necessidade de bloqueios distribuídos.

## CQRS (Command Query Responsibility Segregation)

CQRS separa as operações de leitura (Query) das operações de escrita (Command) em um sistema. Essa separação permite otimizar cada lado de acordo com suas necessidades, facilitando a escalabilidade, manutenção e evolução do domínio.

## Domain Event com Memento

Eventos de domínio (Domain Events) são usados para notificar outras partes do sistema sobre mudanças importantes no domínio. O padrão Memento permite capturar e restaurar o estado de um objeto em determinado momento. No contexto de eventos de domínio, o Memento pode ser utilizado para registrar o estado de uma entidade (por exemplo, `Book.ts`) no momento em que um evento ocorre, facilitando auditoria e recuperação de informações.

### Por que nosso domínio se comunica?

O domínio se comunica por meio de eventos para garantir que diferentes partes do sistema possam reagir a mudanças de estado sem acoplamento direto, promovendo flexibilidade e extensibilidade.

## Diferença entre Memento e Observer

- **Memento:** Permite capturar e restaurar o estado de um objeto sem violar seu encapsulamento. É útil para implementar funcionalidades como desfazer/refazer.
- **Observer:** Permite que objetos sejam notificados automaticamente quando o estado de outro objeto muda. É usado para implementar comunicação reativa entre componentes.

Enquanto o Memento foca em armazenar e restaurar estados, o Observer trata da notificação de mudanças de estado para múltiplos interessados.