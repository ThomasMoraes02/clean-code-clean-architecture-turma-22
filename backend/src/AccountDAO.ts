import pgp from 'pg-promise';

/**
 * Interface de acesso a dados para contas. Ela define os métodos que devem ser implementados por qualquer classe que queira fornecer acesso a dados para contas. Note que ela é uma interface, o que permite que seja implementada de diferentes formas (por exemplo, usando um banco de dados relacional, um banco de dados NoSQL, ou mesmo em memória) sem que o código do serviço precise ser alterado.
 */
export default interface AccountDAO {
    save(account: any): Promise<void>;
    getById(accountId: string): Promise<any>;
}

/**
 * Implementação de AccountDAO usando banco de dados PostgreSQL. Note que ela implementa a interface AccountDAO, o que permite que seja usada no lugar da implementação em memória sem que o código do serviço precise ser alterado.
 */
export class AccountDAODatabase implements AccountDAO {
    async save(account: any): Promise<void> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        await connection.query("INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [account.accountId, account.name, account.email, account.document, account.password]);
        await connection.$pool.end();
    }

    async getById(accountId: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        const [account] = await connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
        await connection.$pool.end();
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

    async getById(accountId: string): Promise<any> {
        return this.accounts.find(account => account.accountId === accountId);
    }
}