import { AppError } from "./AppError.errors";

export class UnauthorizedError extends AppError {
  readonly type = "UNAUTHORIZED";

  constructor(public readonly message = "Unauthorized") {
    super(message);
  }
}
