import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { AccountDAODatabase } from './AccountDAO';
import AccountService from './main';

const app = express();

app.use(express.json());
app.use(cors());

const accountDao = new AccountDAODatabase();
const accountService = new AccountService(accountDao);

app.post("/signup", async (req: Request, res: Response) => {
    const account = req.body;
    console.log("/signup", account);
    try {
        const output = await accountService.signup(account);
        res.json(output);
    } catch (e: any) {
        res.status(422).json({
            message: e.message
        });
    }
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    console.log("/accounts/:accountId", accountId);
    if (typeof accountId !== "string") {
        return res.status(400).json({ message: "Invalid accountId" });
    }
    const output = await accountService.getAccount(accountId);
    res.json(output);
});

app.listen(3000);