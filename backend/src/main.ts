import { validateCpf } from './examples/validateCpf.base';
import AccountDAO from './AccountDAO';

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

    constructor(readonly accountDAO: AccountDAO) {}

    async signup(account: any): Promise<{ accountId: string }> {
        account.accountId = crypto.randomUUID();
        if(!validateName(account.name)) throw new Error("Invalid name");
        if(!validateEmail(account.email)) throw new Error("Invalid email");
        if(!validateCpf(account.document)) throw new Error("Invalid document");
        if (!validatePassword(account.password)) throw new Error("Invalid password");
        await this.accountDAO.save(account);
        return { accountId: account.accountId };
    }

    async getAccount(accountId: string): Promise<{ accountId: string, name: string, email: string, document: string, password: string }> {
        const account = await this.accountDAO.getById(accountId);
        return account;
    }
}