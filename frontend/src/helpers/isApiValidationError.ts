import type { ApiValidationError } from "@/helpers/ApiError";

export function isApiValidationError(error: unknown): error is ApiValidationError {
    if (typeof error !== 'object' || error === null) {
        return false;
    }

    const value = error as ApiValidationError;

    return typeof value.message === 'string' || typeof value.message === 'object';
}

export function toStringApiValidationError(error: unknown): string {
    let msg = '';
    if (isApiValidationError(error)) {

        if (typeof error.message === 'string') {
            msg = error.message;
        }

        if (typeof error.message === 'object') {
            if (Array.isArray(error.message)) {
                error.message.forEach((error) => {
                    msg += `• ${error.message}<br>`;
                });
            }
        }
    }

    return msg ?? 'Erro ao realizar operação!';
}