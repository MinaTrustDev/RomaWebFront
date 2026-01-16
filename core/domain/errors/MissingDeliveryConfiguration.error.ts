import { AppError } from "./AppError.errors";

export class MissingDeliveryConfiguration extends AppError {
  readonly type = "MissingDeliveryConfiguration";

  constructor(public readonly message = "MissingDeliveryConfiguration") {
    super(message);
  }
}
