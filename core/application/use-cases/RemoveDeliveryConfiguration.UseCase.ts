

import { IStorageRepository } from "../interfaces/iStorage.interface";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export class RemoveDeliveryConfigurationUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(): Promise<void> {
    await this.storageRepository.delete("delivery_configuration");
    revalidatePath("/", "layout");
    redirect("/");
  }
}
