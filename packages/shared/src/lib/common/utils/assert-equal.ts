export function assertEqual<T>(actual: T, expected: T, fieldName: string): void {
    if (actual !== expected) {
        throw new Error(`${fieldName} expected ${expected}, but got ${actual}`);
    }
}
