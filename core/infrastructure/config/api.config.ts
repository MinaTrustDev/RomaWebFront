import { createBasicAuth } from "@/lib/axiosClient";

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL,
  API_KEY: process.env.API_KEY,
  HEADERS: {
    "api-key": process.env.API_KEY!,
    Authorization: `Basic ${createBasicAuth(
      process.env.API_AUTH_USERNAME!,
      process.env.API_AUTH_PASSWORD!
    )}`!,
  },
};
