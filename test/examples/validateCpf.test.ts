import { validateCpf } from "../../src/examples/validateCpf";

// npx jest test/examples/validateCpf.test.ts --coverage

describe("validateCpf", () => {
    test.each([
        "97456321558",
        "71428793860",
        "87748248800"
    ])("should validate a valid CPF: %s", (value) => {
        // given
        const cpf = value;
        // when
        const isValid = validateCpf(cpf);
        // then
        expect(isValid).toBe(true);
    });

    test.each([
        null,
        undefined,
        "11111111111",
        "111",
        "111111111111111",
    ])("should invalidate an invalid CPF: %s", (value: any) => {
        // given
        const cpf = value;
        // when
        const isValid = validateCpf(cpf);
        // then
        expect(isValid).toBe(false);
    });
})