import axios from "axios";

// Permite que o axios não lance erros para status codes diferentes de 2xx, para que possamos testar os erros
axios.defaults.validateStatus = () => true;

test("Deve criar uma conta", async () => {
    // Given
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
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

test("Não deve criar uma conta com nome inválido", async () => {
    const input = {
        name: "John",
        email: "john.doe@gmail.com",
        document: "123.456.789-09",
        password: "THOmoraes123"
    }
    const response = await axios.post("http://localhost:3000/signup", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Invalid name");
});