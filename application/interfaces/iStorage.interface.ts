export interface IStorage {
  get(key: string): any | null;
  set(key: string, value: any): void;
  delete(key: string): void;
}
