import Account from "../../domain/Account";
import AccountAssetDAO from "../dao/AccountAssetDAO";
import AccountDAO from "../dao/AccountDAO";
import DatabaseConnection from "../database/DatabaseConnection";
import Registry, { inject } from "../di/Registry";

export default interface AccountRepository {
    save(acccount: Account): Promise<void>;
    getById(accountId: string): Promise<Account>;
    update(account: Account): Promise<void>;
}

export default class AccountRepositoryDatabase implements AccountRepository {
    @inject("accountDAO")
    accountDAO!: AccountDAO;
    @inject("accountAssetDAO")
    accountAssetDAO!: AccountAssetDAO;
    @inject("DatabaseConnection")
    connection!: DatabaseConnection;

    constructor() {
        this.accountDAO = Registry.getInstance().inject("accountDAO");
        this.accountAssetDAO = Registry.getInstance().inject("accountAssetDAO");
        this.connection = Registry.getInstance().inject("DatabaseConnection");
    }

    async save(account: Account): Promise<void> {
        await this.accountDAO.save(account);
    }

    async getById(accountId: string): Promise<Account> {
        const accountData = await this.accountDAO.getById(accountId);
        if (!accountData) throw new Error("Account not found");
        const account = new Account(accountData.account_id, accountData.name, accountData.email, accountData.document, accountData.password);
        const accountAssetsData = await this.accountAssetDAO.getByAccountId(accountId);
        for (const accountAssetData of accountAssetsData) {
            account.balances.push({ asset_id: accountAssetData.asset_id, quantity: parseFloat(accountAssetData.quantity) });
        }
        return account;
    }

    async update(account: Account): Promise<void> {
        await this.accountDAO.update(account);
        await this.accountAssetDAO.deleteByAccountId(account.accountId);
        for (const balance of account.balances) {
            await this.accountAssetDAO.save({ accountId: account.accountId, assetId: balance.asset_id, quantity: balance.quantity });
        }
    }
}