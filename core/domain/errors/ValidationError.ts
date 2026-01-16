import { AppError } from "./AppError.errors";

export class ValidationError extends AppError {
  readonly type = "VALIDATION_ERROR";

  constructor(
    message: string,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
  }
}
