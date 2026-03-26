import express from 'express';
import { Request, Response } from 'express';
import pgp from 'pg-promise';
import { validateCpf } from './examples/validateCpf.base';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const connection = pgp()("postgres://postgres:123456@db:5432/app");

interface Account {
    accountId: string;
    name: string;
    email: string;
    document: string;
    password: string;
}

function validatePassword(password: string): boolean {
    if (password.length < 8) return false;
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/[0-9]/)) return false;
    return true;
}

app.post("/signup", async (req: Request, res: Response) => {
    const account: Account = req.body;
    console.log("/signup", account);
    const accountId = crypto.randomUUID();
    if (!account.name.match(/[a-zA-Z]+ [a-zA-Z]+/)) {
        res.status(422).json({ message: "Invalid name" });
        return;
    }

    if (!account.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        res.status(422).json({ message: "Invalid email" });
        return;
    }

    if (!validateCpf(account.document)) {
        res.status(422).json({ message: "Invalid document" });
        return;
    }

    if (!validatePassword(account.password)) {
        res.status(422).json({ message: "Invalid password" });
        return;
    }

    await connection.query("INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [accountId, account.name, account.email, account.document, account.password]);
    res.json({ accountId });
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;

    const [account] = await connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
    
    console.log("/accounts/:accountId", account);

    res.json({
        accountId: account.account_id,
        name: account.name,
        email: account.email,
        document: account.document
    });
});

app.listen(3000);