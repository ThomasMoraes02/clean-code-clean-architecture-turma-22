import { validateCpf } from './examples/validateCpf.base';
import AccountDAO from './AccountDAO';
import Registry, { inject } from './Registry';
import AccountAssetDAO from './AccountAssetDAO';

function validatePassword(password: string): boolean {
    if (password.length < 8) return false;
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/[0-9]/)) return false;
    return true;
}

function validateName(name: string): boolean {
    return name.match(/[a-zA-Z]+ [a-zA-Z]+/) !== null;
}

function validateEmail(email: string): boolean {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
}

export default class AccountService {
    @inject("accountDAO")
    accountDAO!: AccountDAO;
    @inject("accountAssetDAO")
    accountAssetDAO!: AccountAssetDAO;

    constructor() {
        this.accountDAO = Registry.getInstance().inject("accountDAO");
        this.accountAssetDAO = Registry.getInstance().inject("accountAssetDAO");
    }

    async signup(account: any): Promise<{ accountId: string }> {
        account.accountId = crypto.randomUUID();
        if(!validateName(account.name)) throw new Error("Invalid name");
        if(!validateEmail(account.email)) throw new Error("Invalid email");
        if(!validateCpf(account.document)) throw new Error("Invalid document");
        if (!validatePassword(account.password)) throw new Error("Invalid password");
        await this.accountDAO.save(account);
        return { accountId: account.accountId };
    }

    async getAccount(accountId: string): Promise<any> {
        const account = await this.accountDAO.getById(accountId);
        if (!account) throw new Error("Account not found");
        account.balances = await this.accountAssetDAO.getByAccountId(accountId);
        return account;
    }

    async deposit(accountAsset: any) {
        const account = await this.accountDAO.getById(accountAsset.accountId);
        if (!account) throw new Error("Account not found");
        await this.accountAssetDAO.save(accountAsset);
    }

    async withdraw(accountAsset: any) {
        const account = await this.getAccount(accountAsset.accountId);
        const balance = account.balances.find((balance: any) => balance.asset_id === accountAsset.assetId);
        const quantiy = parseFloat(balance.quantity) - accountAsset.quantity;
        if (quantiy < 0) throw new Error("Insufficient funds");
        await this.accountAssetDAO.update({accountId: accountAsset.accountId, assetId: accountAsset.assetId, quantity: quantiy});
    }
}