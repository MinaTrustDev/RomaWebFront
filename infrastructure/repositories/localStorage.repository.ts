import { IStorage } from "@/application/interfaces/iStorage.interface";

export class LocalStorageRepository implements IStorage {
  get(key: string): any | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
