# Aula 3 - Test Patterns (Stub, Spy, Mock, Fake), Dependency Injection, Clean Architecture

### Test Patterns | Test Doubles
- *Dummy*: Objetos que criamos para completar a lista de parâmetros que precisamos passar para invocar um determinado método.

- *Stub*: Objetos que retornam respostas prontas, definidas para um determinado teste por questão de performance ou segurança. (ex: preciso que o método que retorne a cotação do dólar retorne $ 3,00)
Ex: Sobreescreve o comportamento de um método

- *Spie*: Objetos que espionam a execução do método e armazenam o resultado para verificação posterior.
Ex: verifica se determinado método foi chamado - ele monitora

- *Mock*: Objetos similares a stubs e spies permite que você diga exatamente o que quer que ele faça no teste.

- *Fake*: Implementação falsa que simula exatamente a implementação real (ex: base de dados em memória)

### Dependency Injection vs Dependency Inversion
*Inversão*: substituição de implementações concretas por abstrações genéricas
*Injeção*: ato de definir dependências 

### Clean Architecture:
É um modelo que tem como objetivo o desacoplamento de regras de negócio, ou domínio, da aplicação e os recursos externos como frameworks e bancos de dados.

O centro da sua aplicação são os UseCases, não os bancos de dados... Robert Martin

(Enterprise Business Rules) 
- Entities: Regras de negócio independentes
- O problema do domínio anêmico: não é composto por caracteristicas e comportamentos 

(Application Business Rules): 
- UseCases: Regras da aplicação
- Expor comportamentos
- Caso de Uso é diferente de CRUD? 
- CRUD: Orquestração do Banco de Dados
- UseCase: Orquestração de um comportamento

(Interface Adapters): 
- Controllers, Gateways, Presenters

(Frameworkds & Drivers): 
- Devices, DB, UI, Web
