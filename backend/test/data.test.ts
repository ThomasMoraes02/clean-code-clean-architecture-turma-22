import { AccountDAODatabase } from "../src/AccountDAO";
import { getAccountById, saveAccount } from "../src/data";

test("Deve persistir uma conta", async () => {
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
});