export class ApiValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiValidationException';
    }
}
