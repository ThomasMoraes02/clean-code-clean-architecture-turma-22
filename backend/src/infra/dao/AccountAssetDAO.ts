import DatabaseConnection from "../database/DatabaseConnection";
import Registry, { inject } from "../di/Registry";

export default interface AccountAssetDAO {
    save(accountAsset: any): Promise<void>;
    update(accountAsset: any): Promise<void>;
    deleteByAccountId(accountId: string): Promise<void>;
    getByAccountId(accountId: string): Promise<any>;
}

export class AccountAssetDAODatabase implements AccountAssetDAO {
    @inject("DatabaseConnection")
    connection!: DatabaseConnection;

    constructor() {
        this.connection = Registry.getInstance().inject("DatabaseConnection");
    }

    async save(accountAsset: any): Promise<void> {
        await this.connection.query("INSERT INTO ccca.account_asset (account_id, asset_id, quantity) VALUES ($1, $2, $3)", [accountAsset.accountId, accountAsset.assetId, accountAsset.quantity]);
    }

    async update(accountAsset: any): Promise<void> {
        await this.connection.query("UPDATE ccca.account_asset SET quantity = $1 WHERE account_id = $2 AND asset_id = $3", [accountAsset.quantity, accountAsset.accountId, accountAsset.assetId]);
    }

    async deleteByAccountId(accountId: string): Promise<void> {
        await this.connection.query("DELETE FROM ccca.account_asset WHERE account_id = $1", [accountId]);
    }

    async getByAccountId(accountId: string): Promise<any> {
        const accountAssets = await this.connection.query("SELECT * FROM ccca.account_asset WHERE account_id = $1", [accountId]);
        return accountAssets;
    }
}