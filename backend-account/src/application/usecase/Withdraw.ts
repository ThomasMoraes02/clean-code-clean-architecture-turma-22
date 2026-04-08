import Registry, { inject } from "../../infra/di/Registry";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class Withdraw {
    @inject("accountRepository")
    accountRepository!: AccountRepository;

    constructor() {
        this.accountRepository = Registry.getInstance().inject("accountRepository");
    }

    async execute(input: Input): Promise<void> {
        const account = await this.accountRepository.getById(input.accountId);
        account.withdraw(input.assetId, input.quantity);
        await this.accountRepository.update(account);
    }
}

type Input = {
    accountId: string;
    assetId: string;
    quantity: number;
}