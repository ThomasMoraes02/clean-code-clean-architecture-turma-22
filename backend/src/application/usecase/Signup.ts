import Account from "../../domain/Account";
import AccountDAO from "../../infra/dao/AccountDAO";
import Registry, { inject } from "../../infra/di/Registry";

export default class Signup {
        @inject("accountDAO")
        accountDAO!: AccountDAO;
    
        constructor() {
            this.accountDAO = Registry.getInstance().inject("accountDAO");
        }
    
    async execute(input: Input): Promise<Output> {
        const account = Account.create(input.name, input.email, input.document, input.password);
        await this.accountDAO.save(account);
        return { accountId: account.accountId };
    }
}

type Input = {
    name: string;
    email: string;
    document: string;
    password: string;
}

type Output = {
    accountId: string;
}