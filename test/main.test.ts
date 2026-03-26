import axios from "axios";

test("Deve criar uma conta", async () => {
    // Given
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "12345678"
    }

    // When
    const response = await axios.post("http://localhost:3000/signup", input);
    const output = response.data;

    // Then
    expect(output.accountId).toBeDefined();

    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${output.accountId}`);
    const outputGetAccount = responseGetAccount.data;

    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
});