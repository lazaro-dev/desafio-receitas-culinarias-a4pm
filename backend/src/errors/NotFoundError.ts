import { HttpError } from "@/errors/HttpError";

export class NotFoundError extends HttpError {
    constructor (msg: string = 'Recurso não encontrado.') {
      super(msg, 404);
    }
  }