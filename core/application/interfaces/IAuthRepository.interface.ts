export interface IAuthRepository {
    getGuestId(): Promise<string>;
}