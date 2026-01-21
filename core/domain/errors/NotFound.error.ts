import { AppError } from "./AppError.errors";

export class NotFoundError extends AppError {
  readonly type = "NOT_FOUND";

  constructor(message: string) {
    super(message);
  }
}
