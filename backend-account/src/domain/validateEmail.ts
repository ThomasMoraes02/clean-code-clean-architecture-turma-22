export function validateEmail(email: string): boolean {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
}
