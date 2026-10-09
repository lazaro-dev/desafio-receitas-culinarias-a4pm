import { HttpError } from "./HttpError";

export class UnprocessableEntityError extends HttpError {
  constructor(msg: string = "Dados inválidos.") {
    super(msg, 422);
  }
}