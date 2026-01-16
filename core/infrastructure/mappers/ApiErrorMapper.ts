// infrastructure/mappers/ApiErrorMapper.ts
import { AppError } from "@/core/domain/errors/AppError.errors";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { ValidationError } from "../../domain/errors/ValidationError";

export class ApiErrorMapper {
  static toDomain(error: any, status: number): AppError {
    if (status === 401) {
      return new UnauthorizedError(error.message);
    }

    if (error.errors) {
      return new ValidationError(error.message, error.errors);
    }

    return new (class extends AppError {
      readonly type = "UNKNOWN_ERROR";
    })(error.message);
  }
}
