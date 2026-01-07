import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Get credentials from environment variables
const AUTH_USERNAME = process.env.API_AUTH_USERNAME || "";
const AUTH_PASSWORD = process.env.API_AUTH_PASSWORD || "";
const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://roma2go.com/wp-json";

// Validate required environment variables
if (!AUTH_USERNAME || !AUTH_PASSWORD) {
  console.warn(
    "Warning: API_AUTH_USERNAME or API_AUTH_PASSWORD not set in environment variables"
  );
}

// Create Basic Auth header (works in both Node.js and browser)
const createBasicAuth = (username: string, password: string): string => {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return Buffer.from(`${username}:${password}`).toString("base64");
  } else {
    // Browser environment (fallback)
    return btoa(`${username}:${password}`);
  }
};

const basicAuth = createBasicAuth(AUTH_USERNAME, AUTH_PASSWORD);

// Create axios instance with default config
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased to 30 seconds for slower API responses
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${basicAuth}`,
  },
});
