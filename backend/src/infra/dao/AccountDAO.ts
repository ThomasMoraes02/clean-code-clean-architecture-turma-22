import DatabaseConnection from "../database/DatabaseConnection";
import Registry, { inject } from "../di/Registry";

/**
 * Interface de acesso a dados para contas. Ela define os métodos que devem ser implementados por qualquer classe que queira fornecer acesso a dados para contas. Note que ela é uma interface, o que permite que seja implementada de diferentes formas (por exemplo, usando um banco de dados relacional, um banco de dados NoSQL, ou mesmo em memória) sem que o código do serviço precise ser alterado.
 */
export default interface AccountDAO {
    save(account: any): Promise<void>;
    update(account: any): Promise<void>;
    getById(accountId: string): Promise<any>;
}

/**
 * Implementação de AccountDAO usando banco de dados PostgreSQL. Note que ela implementa a interface AccountDAO, o que permite que seja usada no lugar da implementação em memória sem que o código do serviço precise ser alterado.
 */
export class AccountDAODatabase implements AccountDAO {
    @inject("DatabaseConnection")
    connection!: DatabaseConnection;

    constructor() {
        this.connection = Registry.getInstance().inject("DatabaseConnection");
    }

    async save(account: any): Promise<void> {
        await this.connection.query("INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [account.accountId, account.getName(), account.email, account.document, account.password]);
    }

    async update(account: any): Promise<void> {
        await this.connection.query("UPDATE ccca.account SET name = $1, email = $2, document = $3, password = $4 WHERE account_id = $5", [account.getName(), account.email, account.document, account.password, account.accountId]);
    }

    async getById(accountId: string): Promise<any> {
        const [account] = await this.connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
        return account;
    }
}

/**
 * Implementação de AccountDAO em memória, para ser usada nos testes unitários. Note que ela implementa a interface AccountDAO, o que permite que seja usada no lugar da implementação de banco de dados sem que o código do serviço precise ser alterado.
 */
export class AccountDAOMemory implements AccountDAO {
    private accounts: any[] = [];

    async save(account: any): Promise<void> {
        this.accounts.push(account);
    }

    async update(account: any): Promise<void> {
        const index = this.accounts.findIndex(a => a.accountId === account.accountId);
        if (index === -1) throw new Error("Account not found");
        this.accounts[index] = account;
    }

    async getById(accountId: string): Promise<any> {
        return this.accounts.find(account => account.accountId === accountId);
    }
}