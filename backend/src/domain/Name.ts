export default class Name {
    private value: string;

    constructor(value: string) {
        if (!this.isValid(value)) throw new Error("Invalid name");
        this.value = value;
    }

    private isValid(value: string): boolean {
        return value.match(/[a-zA-Z]+ [a-zA-Z]+/) !== null;
    }

    getValue(): string {
        return this.value;
    }
}