import Registry, { inject } from "../../infra/di/Registry";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAccount {
    @inject("accountRepository")
    accountRepository!: AccountRepository;

    constructor() {
        this.accountRepository = Registry.getInstance().inject("accountRepository");
    }

    async execute (accountId: string): Promise<Output> {
        const account = await this.accountRepository.getById(accountId);
        return {
            accountId: account.accountId,
            name: account.getName(),
            email: account.getEmail(),
            document: account.getDocument(),
            password: account.getPassword(),
            balances: account.balances
        };
    }
}

type Output = {
    accountId: string,
    name: string,
    email: string,
    document: string,
    password: string,
    balances: { assetId: string, quantity: number }[]
}