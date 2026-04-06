import { validateCpf } from "./examples/validateCpf";
import Name from "./Name";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

export default class Account {
    balances: Balance[] = [];

    private name: Name;

    constructor(readonly accountId: string, name: string, readonly email: string, readonly document: string, readonly password: string) {
        this.name = new Name(name);
        if(!validateEmail(email)) throw new Error("Invalid email");
        if(!validateCpf(document)) throw new Error("Invalid document");
        if (!validatePassword(password)) throw new Error("Invalid password");
    }   

    static create(name: string, email: string, document: string, password: string)
    {
        const accountId = crypto.randomUUID();
        return new Account(accountId, name, email, document, password);
    }

    deposit(assetId: string, quantity: number): void {
        const balance = this.balances.find(balance => balance.asset_id === assetId);
        if (balance) {
            balance.quantity += quantity;
        } else {
            this.balances.push({ asset_id: assetId, quantity });
        }
    }

    withdraw(assetId: string, quantity: number): void {
        const balance = this.balances.find(balance => balance.asset_id === assetId);
        if (!balance || balance.quantity < quantity) throw new Error("Insufficient funds");
        balance.quantity -= quantity;
    }

    getName(): string {
        return this.name.getValue();
    }
}

type Balance = {
    asset_id: string;
    quantity: number;
};