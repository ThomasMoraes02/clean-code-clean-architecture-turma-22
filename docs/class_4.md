# Aula 4 - Domain Driven Design (DDD)
### Organização de Projeto e Clean Architecture

- **Camada:** Refere-se à separação lógica das responsabilidades no sistema.
- **Pastas:** Diz respeito à organização física dos arquivos e diretórios.

**Clean Architecture (4 camadas principais):**
- **Entities:** Contêm as regras de negócio essenciais, independentes de frameworks e facilmente reutilizáveis.
    - *Exemplo:* `User`, `Order`, `Product`
- **Use Cases:** Coordenam os fluxos de negócio da aplicação, orquestrando entidades e serviços.
    - *Exemplo:* `CreateOrder`, `RegisterUser`
- **Interface Adapters:** Adaptam dados e interfaces entre o domínio e o mundo externo (APIs, banco de dados, UI).
    - *Exemplo:* Controllers, Repositórios, DTOs
- **Frameworks & Drivers:** Infraestrutura e ferramentas externas utilizadas pela aplicação.
    - *Exemplo:* Express, PostgreSQL, Redis

---

### Node.js e Arquitetura

- O Node.js é single-threaded: executa em uma única thread, mas utiliza o event loop para lidar com operações assíncronas de forma eficiente.

**Event Driven:** Modelo orientado a eventos, onde ações são disparadas por eventos como requisições HTTP ou mensagens em filas.

**Padrão Saga:** Gerencia transações distribuídas, coordenando múltiplos serviços para garantir a consistência dos dados.

---

### Domain Driven Design: Modelagem Tática

**Domínio:** É o problema de negócio a ser resolvido, independente da tecnologia utilizada.

**Linguagem Ubíqua:** Vocabulário comum entre equipe técnica e de negócio, eliminando ambiguidades e facilitando a comunicação.

#### Estratégico:
- Define os limites do sistema (Bounded Contexts) e as interações entre eles.

#### Tático: (Foco nas regras de negócio)

**Principais conceitos:**

- **Domain Model:** Representa os conceitos centrais do negócio.
    - *Exemplo:* Classe `Order` com métodos `addItem`, `calculateTotal`.
- **Domain Service:** Representa operações de negócio que não pertencem a uma única entidade ou value object, mas sim ao domínio como um todo. Um Domain Service encapsula lógica de negócio relevante que envolve múltiplas entidades ou que não se encaixa naturalmente em nenhuma delas.
    - *Exemplo:* `TransferService.transfer(sourceAccount, targetAccount, amount)` realiza a transferência entre contas, coordenando regras de negócio que envolvem mais de uma entidade.
- **Entity:** Possui identidade única e ciclo de vida próprio, sendo definida por sua identidade e não apenas por seus atributos. Mantém estado e pode sofrer alterações ao longo do tempo.
    - *Exemplo:* `User` com `userId`.
    - *Exemplo:* `User` com `userId`.
- **Value Object:** Imutável, definido apenas por seus atributos.
    - *Exemplo:* `Email`, `CPF`, `Money`.
- **Factory:** Responsável por criar instâncias complexas de objetos do domínio.
    - *Exemplo:* `OrderFactory.createFromCart(cart)`.
- **Aggregate:** Agrupa entidades e value objects, garantindo consistência e regras de negócio.
    - *Exemplo:* `Order` como aggregate root, contendo `OrderItems`.
- **Repository:** Abstrai o acesso e persistência de dados do domínio.
    - *Exemplo:* `OrderRepository.save(order)`, `OrderRepository.findById(id)`.
- **Service:** Contém lógica de negócio que não pertence a uma entidade específica.
    - *Exemplo:* `PaymentService.process(order, paymentInfo)`.

---

**Exemplo prático em Node.js:**

```js
// Value Object
class Email {
    constructor(address) {
        if (!address.includes('@')) throw new Error('Invalid email');
        this.address = address;
    }
}

// Entity
class User {
    constructor(id, email) {
        this.id = id;
        this.email = new Email(email);
    }
}

// Repository
class UserRepository {
    constructor() {
        this.users = [];
    }
    save(user) {
        this.users.push(user);
    }
    findById(id) {
        return this.users.find(u => u.id === id);
    }
}

// Use Case
class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(id, email) {
        const user = new User(id, email);
        this.userRepository.save(user);
        return user;
    }
}
```

O exemplo acima ilustra a separação entre Value Object (`Email`), Entity (`User`), Repository (`UserRepository`) e Use Case (`RegisterUser`), seguindo os princípios de DDD e Clean Architecture.

**Obsessão por tipos primitivos vs Value Objects:** Prefira encapsular conceitos de negócio em Value Objects ao invés de utilizar tipos primitivos diretamente, aumentando a expressividade e segurança do código.

