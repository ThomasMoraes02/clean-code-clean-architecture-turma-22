export function validateName(name: string): boolean {
    return name.match(/[a-zA-Z]+ [a-zA-Z]+/) !== null;
}
