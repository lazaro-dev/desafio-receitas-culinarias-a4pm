import { HttpError } from "@/errors/HttpError";

export class BadRequestError extends HttpError {
    constructor (msg: string = 'Erro de solicitação.') {
      super(msg, 400);
    }
  }