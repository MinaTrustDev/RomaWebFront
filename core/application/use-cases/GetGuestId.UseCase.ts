import { IAuthRepository } from "../interfaces/IAuthRepository.interface";
import { IStorageRepository } from "../interfaces/iStorage.interface";

export class GetGuestIdUseCase {
    constructor(private storageRepository: IStorageRepository, private authRepository: IAuthRepository) {}

    async execute(): Promise<string> {
        const newGuestId = await this.authRepository.getGuestId();
        // await this.storageRepository.set("guest_id", newGuestId);
        return newGuestId;
    }
}