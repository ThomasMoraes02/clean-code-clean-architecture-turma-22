
import Registry from "../../src/infra/di/Registry";
import PgPromiseAdapter from "../../src/infra/database/DatabaseConnection";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import AccountRepositoryDatabase from '../../src/infra/repository/AccountRepository';
import AccountDAO, { AccountDAODatabase } from "../../src/infra/dao/AccountDAO";
import Signup from "../../src/application/usecase/Signup";
import GetAccount from "../../src/application/usecase/GetAccount";
import Deposit from "../../src/application/usecase/Deposit";
import Withdraw from "../../src/application/usecase/Withdraw";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO";

let connection: DatabaseConnection;
let acccountDao: AccountDAO;
let signUp: Signup;
let getAccount: GetAccount;
let deposit: Deposit;
let withdraw: Withdraw;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    Registry.getInstance().provide("DatabaseConnection", connection);
    acccountDao = new AccountDAODatabase();
    Registry.getInstance().provide("accountDAO", acccountDao);
    const accountAssetDao = new AccountAssetDAODatabase();
    Registry.getInstance().provide("accountAssetDAO", accountAssetDao);
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    signUp = new Signup();
    getAccount = new GetAccount();
    deposit = new Deposit();
    withdraw = new Withdraw();
});

test("Deve sacar de uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const outputSignup = await signUp.execute(input);
    const inputDeposit = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 1000
    };
    await deposit.execute(inputDeposit);
    const inputWithdraw = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 500
    };
    await withdraw.execute(inputWithdraw);

    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputGetAccount.balances[0]?.assetId).toBe('USD');
    expect(outputGetAccount.balances[0]?.quantity).toBe(500);
});

afterEach(async () => {
    await connection.close();
})