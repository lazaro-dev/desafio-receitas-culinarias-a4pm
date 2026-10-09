import { HttpError } from "@/errors/HttpError";

export class AccessDeniedError extends HttpError {
    constructor (msg: string = 'Acesso negado.') {
      super(msg, 403);
    }
  }