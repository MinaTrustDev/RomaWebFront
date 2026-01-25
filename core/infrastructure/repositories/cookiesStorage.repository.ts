// "use server";

import { IStorageRepository } from "@/core/application/interfaces/iStorage.interface";
import { cookies } from "next/headers";

export class CookiesStorageRepository implements IStorageRepository {
  async get(key: string): Promise<any | null> {
    const cookiesStorage = await cookies();
    const value = cookiesStorage.get(key)?.value;

    if (!value) {
      return null;
    }

    try {
      // Parse JSON string back to object
      return JSON.parse(value);
    } catch {
      // If parsing fails, return the raw value (for backward compatibility)
      return value;
    }
  }

  async set(key: string, value: any): Promise<void> {
    const cookiesStorage = await cookies();

    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    cookiesStorage.set(key, serializedValue, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  async delete(key: string): Promise<void> {
    // console.log("delete", key);
    const cookiesStorage = await cookies();
    cookiesStorage.delete(key);
  }
}
