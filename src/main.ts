import express from 'express';
import { Request, Response } from 'express';
import pgp from 'pg-promise';

const app = express();

app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db:5432/app");

interface Account {
    accountId: string;
    name: string;
    email: string;
    document: string;
    password: string;
}

app.post("/signup", async (req: Request, res: Response) => {
    const account: Account = req.body;

    console.log("/signup", account);

    const accountId = crypto.randomUUID();

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