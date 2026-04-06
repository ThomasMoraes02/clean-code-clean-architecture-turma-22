
import Registry from "../../src/infra/di/Registry";
import PgPromiseAdapter from "../../src/infra/database/DatabaseConnection";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import AccountRepositoryDatabase from '../../src/infra/repository/AccountRepository';
import AccountDAO, { AccountDAODatabase } from "../../src/infra/dao/AccountDAO";
import Signup from "../../src/application/usecase/Signup";
import Deposit from "../../src/application/usecase/Deposit";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import GetOrder from "../../src/application/usecase/GetOrder";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepository";
import GetDepth from "../../src/application/usecase/GetDepth";
import MediatorMemory from "../../src/infra/mediator/Mediator";
import ExecuteOrder from "../../src/application/usecase/ExecuteOrder";

let connection: DatabaseConnection;
let acccountDao: AccountDAO;
let signUp: Signup;
let deposit: Deposit;
let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let getDepth: GetDepth;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    Registry.getInstance().provide("DatabaseConnection", connection);
    acccountDao = new AccountDAODatabase();
    Registry.getInstance().provide("accountDAO", acccountDao);
    const accountAssetDao = new AccountAssetDAODatabase();
    Registry.getInstance().provide("accountAssetDAO", accountAssetDao);
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    Registry.getInstance().provide("orderRepository", new OrderRepositoryDatabase());
    const mediator = new MediatorMemory();
    Registry.getInstance().provide("mediator", mediator);
    signUp = new Signup();
    deposit = new Deposit();
    placeOrder = new PlaceOrder();
    getOrder = new GetOrder();
    getDepth = new GetDepth();
    const executeOrder = new ExecuteOrder();
    mediator.register("orderPlaced", async (event: any) => {
        await executeOrder.execute(event.marketId);
    });
});

test("Deve criar uma ordem de compra", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 100000
    };
    await deposit.execute(inputDeposit);
    const inputPlaceOrder = {
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    };
    const outputPlaceOrder = await placeOrder.execute(inputPlaceOrder);
    expect(outputPlaceOrder.orderId).toBeDefined();
    const outputGetOrder = await getOrder.execute(outputPlaceOrder.orderId);
    expect(outputGetOrder.side).toBe(inputPlaceOrder.side);
    expect(outputGetOrder.quantity).toBe(inputPlaceOrder.quantity);
    expect(outputGetOrder.price).toBe(inputPlaceOrder.price);
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(1);
    expect(outputGetDepth.sells).toHaveLength(0);
    expect(outputGetDepth.buys[0]!.quantity).toBe(1);
    expect(outputGetDepth.buys[0]!.price).toBe(85000);
});

test("Deve criar várias ordens de compra e verificar o depth", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 1000000
    };
    await deposit.execute(inputDeposit);
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(1);
    expect(outputGetDepth.sells).toHaveLength(0);
    expect(outputGetDepth.buys[0]!.quantity).toBe(2);
    expect(outputGetDepth.buys[0]!.price).toBe(85000);
});

test("Deve criar várias ordens de compra com preços diferentes e verificar o depth", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 1000000
    };
    await deposit.execute(inputDeposit);
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 84000
    });
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(2);
    expect(outputGetDepth.sells).toHaveLength(0);
    expect(outputGetDepth.buys[0]!.quantity).toBe(1);
    expect(outputGetDepth.buys[0]!.price).toBe(84000);
    expect(outputGetDepth.buys[1]!.quantity).toBe(2);
    expect(outputGetDepth.buys[1]!.price).toBe(85000);
});

test("Deve criar uma ordem de compra e uma de venda com o mesmo valor", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 1000000
    };
    await deposit.execute(inputDeposit);
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "sell",
        quantity: 1,
        price: 85000
    });
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(0);
    expect(outputGetDepth.sells).toHaveLength(0);
});

test("Deve criar duas ordens de compra, e uma ordem de venda, no mesmo valor e mesma quantidade", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 1000000
    };
    await deposit.execute(inputDeposit);
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 1,
        price: 85000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "sell",
        quantity: 2,
        price: 85000
    });
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(0);
    expect(outputGetDepth.sells).toHaveLength(0);
});

test("Deve criar três ordens de compra, e uma ordem de venda, com valores diferentes e mesma quantidade", async () => {
    const marketId = `BTC/USD/${Math.random()}`;

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
        quantity: 1000000
    };
    await deposit.execute(inputDeposit);
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "sell",
        quantity: 1,
        price: 82000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "sell",
        quantity: 1,
        price: 84000
    });
    await placeOrder.execute({
        accountId: outputSignup.accountId,
        marketId: marketId,
        side: "buy",
        quantity: 2,
        price: 85000
    });
    const outputGetDepth = await getDepth.execute(marketId);
    expect(outputGetDepth.buys).toHaveLength(0);
    expect(outputGetDepth.sells).toHaveLength(0);
});

afterEach(async () => {
    await connection.close();
})