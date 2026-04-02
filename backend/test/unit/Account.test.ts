import Account from "../../src/domain/Account";

test("Deve fazer um saque", () => {
    const account = Account.create("Jhon Doe", "jhon.doe@example.com", "12345678909", "THomraes1213");
    account.deposit("USD", 500);
    account.withdraw("USD", 100);
    expect(account.balances[0]?.quantity).toBe(400);
});