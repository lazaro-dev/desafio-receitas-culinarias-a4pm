import { HttpError } from "@/errors/HttpError";

export class UnauthorizedError extends HttpError {
    constructor (msg: string = 'Não autenticado.') {
      super(msg, 401);
    }
  }