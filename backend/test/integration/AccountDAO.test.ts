
import Registry from "../../src/infra/di/Registry";
import PgPromiseAdapter from "../../src/infra/database/DatabaseConnection";
import { AccountDAODatabase } from "../../src/infra/dao/AccountDAO";

test("Deve persistir uma conta", async () => {
    const connection = new PgPromiseAdapter();
    Registry.getInstance().provide("DatabaseConnection", connection);

    const accountDAO = new AccountDAODatabase();
    const accountId = crypto.randomUUID();

    const account = {
        accountId: accountId,
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    await accountDAO.save(account);
    const accountFromDb = await accountDAO.getById(accountId);
    expect(accountFromDb.name).toBe(account.name);
    expect(accountFromDb.email).toBe(account.email);
    expect(accountFromDb.document).toBe(account.document);
    expect(accountFromDb.password).toBe(account.password);

    await connection.close();
});