import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/main";
import AccountDAO from '../src/AccountDAO';

let acccountDao: AccountDAO;
let accountService: AccountService;

beforeEach(() => {
    acccountDao = new AccountDAOMemory();
    accountService = new AccountService(acccountDao);
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