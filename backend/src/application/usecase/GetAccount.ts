import Registry, { inject } from "../../infra/di/Registry";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAccount {
    @inject("accountRepository")
    accountRepository!: AccountRepository;

    constructor() {
        this.accountRepository = Registry.getInstance().inject("accountRepository");
    }

    async execute(accountId: string): Promise<Output> {
        const account = await this.accountRepository.getById(accountId);
        return account;
    }
}

type Output = {
    accountId: string;
    name: string;
    email: string;
    document: string;
    balances: { asset_id: string; quantity: number }[];
}