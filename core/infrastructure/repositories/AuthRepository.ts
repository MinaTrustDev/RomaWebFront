import { IAuthRepository } from "@/core/application/interfaces/IAuthRepository.interface";
import { axiosClient } from "@/lib/axiosClient";
import { API_CONFIG } from "../config/api.config";

export class AuthRepository implements IAuthRepository {
    async getGuestId(): Promise<string> {
        const response = await axiosClient.get<{ guest_id: string }>(
      `${API_CONFIG.API_URL}/guest-cart/v1/generate-guest-id`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );
    return response.data.guest_id;
    }
}