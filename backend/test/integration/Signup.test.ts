import GetAccount from "../../src/application/usecase/GetAccount";
import Signup from "../../src/application/usecase/Signup";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO";
import { AccountDAODatabase, AccountDAOMemory } from "../../src/infra/dao/AccountDAO";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import AccountRepositoryDatabase from "../../src/infra/repository/AccountRepository";
import PgPromiseAdapter from "../../src/infra/database/DatabaseConnection";

import Registry from "../../src/infra/di/Registry";
import sinon from "sinon";

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    Registry.getInstance().provide("DatabaseConnection", connection);
    const accountDAO = new AccountDAODatabase();
    Registry.getInstance().provide("accountDAO", accountDAO);
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    signup = new Signup();
    getAccount = new GetAccount();
});

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
});

test("Não deve criar uma conta com nome inválido", async () => {
    const input = {
        name: "John",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    await expect(() => signup.execute(input)).rejects.toThrow(new Error("Invalid name"));
});

test("Deve criar uma conta com stub", async () => {
    const saveStub = sinon.stub(AccountDAODatabase.prototype, "save").resolves();
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const getByIdStub = sinon.stub(AccountDAODatabase.prototype, "getById").resolves(input);
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
    saveStub.restore();
    getByIdStub.restore();
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

    it("Deve criar uma conta com spy", async () => {
        const saveSpy = sinon.spy(AccountDAODatabase.prototype, "save");
        const getByIdSpy = sinon.spy(AccountDAODatabase.prototype, "getById");
        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "97456321558",
            password: "asdQWE123"
        }
        const outputSignup = await signup.execute(input);
        const outputGetAccount = await getAccount.execute(outputSignup.accountId);
        expect(outputSignup.accountId).toBeDefined();
        expect(outputGetAccount.name).toBe(input.name);
        expect(outputGetAccount.email).toBe(input.email);
        expect(outputGetAccount.document).toBe(input.document);
        expect(outputGetAccount.password).toBe(input.password);
        expect(saveSpy.calledOnce).toBe(true);
        expect(getByIdSpy.calledWith(outputSignup.accountId)).toBe(true);
        expect(getByIdSpy.calledOnce).toBe(true);
        saveSpy.restore();
        getByIdSpy.restore();
    });
    
    it("Deve criar uma conta com mock", async () => {
        const accountDAOMock = sinon.mock(AccountDAODatabase.prototype);
        accountDAOMock.expects("save").once().resolves();
        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "97456321558",
            password: "asdQWE123"
        }
        accountDAOMock.expects("getById").once().resolves(input);
        const outputSignup = await signup.execute(input);
        const outputGetAccount = await getAccount.execute(outputSignup.accountId);
        expect(outputSignup.accountId).toBeDefined();
        expect(outputGetAccount.name).toBe(input.name);
        expect(outputGetAccount.email).toBe(input.email);
        expect(outputGetAccount.document).toBe(input.document);
        expect(outputGetAccount.password).toBe(input.password);
        accountDAOMock.verify();
        accountDAOMock.restore();
    });
    
    it("Deve criar uma conta com fake", async () => {
        const accountRepository = new AccountDAOMemory();
        Registry.getInstance().provide("accountRepository", accountRepository);
        signup = new Signup();
        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "97456321558",
            password: "asdQWE123"
        }
        const outputSignup = await signup.execute(input);
        const outputGetAccount = await getAccount.execute(outputSignup.accountId);
        expect(outputSignup.accountId).toBeDefined();
        expect(outputGetAccount.name).toBe(input.name);
        expect(outputGetAccount.email).toBe(input.email);
        expect(outputGetAccount.document).toBe(input.document);
        expect(outputGetAccount.password).toBe(input.password);
    });
});

afterEach(async () => {
    await connection.close();
});