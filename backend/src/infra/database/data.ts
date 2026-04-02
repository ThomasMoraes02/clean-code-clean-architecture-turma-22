import pgp from 'pg-promise';

export const saveAccount = async (account: any) => {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    await connection.query("INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [account.accountId, account.name, account.email, account.document, account.password]);
    await connection.$pool.end();
}

export const getAccountById = async (accountId: string) => {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    const [account] = await connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
    await connection.$pool.end();
    return account;
}