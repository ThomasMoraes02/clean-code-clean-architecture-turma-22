import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from '../src/AccountService';
import AccountDAO from '../src/AccountDAO';
import sinon from "sinon";
import Registry from "../src/Registry";
import { AccountAssetDAODatabase } from "../src/AccountAssetDAO";

let acccountDao: AccountDAO;
let accountService: AccountService;

beforeEach(() => {
    acccountDao = new AccountDAODatabase();
    Registry.getInstance().provide("accountDAO", acccountDao);
    const accountAssetDao = new AccountAssetDAODatabase();
    Registry.getInstance().provide("accountAssetDAO", accountAssetDao);
    accountService = new AccountService();
});

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const response = await accountService.signup(input);
    const responseGetAccount = await accountService.getAccount(response.accountId);
    expect(response.accountId).toBeDefined();
    expect(responseGetAccount.name).toBe(input.name);
    expect(responseGetAccount.email).toBe(input.email);
    expect(responseGetAccount.document).toBe(input.document);
});

test("Não deve criar uma conta com nome inválido", async () => {
    const input = {
        name: "John",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }

    await expect(accountService.signup(input)).rejects.toThrow("Invalid name");
});

test("Não deve criar uma conta com email inválido", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }

    await expect(accountService.signup(input)).rejects.toThrow("Invalid email");
});

test("Não deve criar uma conta com documento inválido", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789",
        password: "THOmoraes123"
    }
    await expect(accountService.signup(input)).rejects.toThrow("Invalid document");
});

test("Não deve criar uma conta com senha inválida", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "123"
    }
    await expect(accountService.signup(input)).rejects.toThrow("Invalid password");
});

/**
 * Testes com sinon para demonstrar o uso de stub, spy, mock e fake
 * Stub: é uma função que substitui a implementação de uma função real, permitindo controlar seu comportamento e retorno.
 * Spy: é uma função que registra informações sobre as chamadas feitas a ela, como os argumentos passados e o número de vezes que foi chamada.
 * Mock: é um objeto que simula o comportamento de um objeto real, permitindo definir expectativas sobre as chamadas feitas a ele.
 * Fake: é uma implementação simplificada de uma função ou objeto, usada para testes quando a implementação real é complexa ou não está disponível.
 * 
 * O que é o sinon: é uma biblioteca de teste para JavaScript que fornece funcionalidades para criar stubs, spies, mocks e fakes, facilitando a escrita de testes unitários e de integração.
 */
describe("Testes com sinon", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("Deve criar uma conta com stub", async () => {
        const saveStub = sinon.stub(AccountDAODatabase.prototype, "save").resolves();

        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "123.456.789-09",
            password: "THOmoraes123"
        }

        const getByIdStub = sinon.stub(AccountDAODatabase.prototype, "getById").resolves(input);

        const response = await accountService.signup(input);
        const responseGetAccount = await accountService.getAccount(response.accountId);
        expect(response.accountId).toBeDefined();
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.document).toBe(input.document);

        saveStub.restore();
        getByIdStub.restore();
    });

    it("Deve criar uma conta com spy", async () => {
        const saveSpy = sinon.spy(AccountDAODatabase.prototype, "save");

        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "123.456.789-09",
            password: "THOmoraes123"
        }

        const getByIdSpy = sinon.spy(AccountDAODatabase.prototype, "getById");

        const response = await accountService.signup(input);
        const responseGetAccount = await accountService.getAccount(response.accountId);
        expect(response.accountId).toBeDefined();
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.document).toBe(input.document);

        expect(saveSpy.calledOnce).toBeTruthy();
        expect(getByIdSpy.calledOnce).toBeTruthy();

        saveSpy.restore();
        getByIdSpy.restore();
    });

    it("Deve criar uma conta com mock", async () => {
        const accountDAOMock = sinon.mock(AccountDAODatabase.prototype);
        accountDAOMock.expects("save").once().resolves();

        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "123.456.789-09",
            password: "THOmoraes123"
        }

        accountDAOMock.expects("getById").once().resolves(input);
        const response = await accountService.signup(input);
        const responseGetAccount = await accountService.getAccount(response.accountId);
        expect(response.accountId).toBeDefined();
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.document).toBe(input.document);

        accountDAOMock.verify();
        accountDAOMock.restore();
    });

    it("Deve criar uma conta com fake", async () => {
        const accountDao = new AccountDAOMemory();
        Registry.getInstance().provide("accountDAO", accountDao);
        accountService = new AccountService();

        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "123.456.789-09",
            password: "THOmoraes123"
        }

        const response = await accountService.signup(input);
        const responseGetAccount = await accountService.getAccount(response.accountId);
        expect(response.accountId).toBeDefined();
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.document).toBe(input.document);
    });
});

test("Deve depositar em uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const outputSignup = await accountService.signup(input);
    const inputDeposit = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 1000
    };
    await accountService.deposit(inputDeposit);
    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputGetAccount.balances[0].asset_id).toBe('USD');
    expect(outputGetAccount.balances[0].quantity).toBe("1000");
});

test("Não deve depositar em uma conta que não existe", async () => {
    const inputDeposit = {
        accountId: crypto.randomUUID(),
        assetId: "USD",
        quantity: 1000
    };
    await expect(accountService.deposit(inputDeposit)).rejects.toThrow(new Error("Account not found"));
});

test("Deve sacar de uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const outputSignup = await accountService.signup(input);
    const inputDeposit = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 1000
    };
    await accountService.deposit(inputDeposit);
    const inputWithdraw = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 500
    };
    await accountService.withdraw(inputWithdraw);

    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputGetAccount.balances[0].asset_id).toBe('USD');
    expect(outputGetAccount.balances[0].quantity).toBe("500");
});

test("Não deve sacar se não houver saldo suficiente", async () => {
        const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const outputSignup = await accountService.signup(input);
    const inputDeposit = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 500
    };
    await accountService.deposit(inputDeposit);
    const inputWithdraw = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 1000
    };
    await expect(() => accountService.withdraw(inputWithdraw)).rejects.toThrow(new Error("Insufficient funds"));
});