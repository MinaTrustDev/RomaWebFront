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
    // Prevent HTTP response caching from intermediaries and browsers
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
  },
  // Add request interceptor for better error handling
  validateStatus: (status) => {
    // Don't throw for 4xx and 5xx, handle them in catch blocks
    return status >= 200 && status < 600;
  },
});

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    // Only return successful responses (2xx)
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    // For non-2xx responses, throw an error
    const error = new Error(
      `Request failed with status ${response.status}: ${response.statusText}`
    );
    (error as any).response = response;
    throw error;
  },
  (error: AxiosError) => {
    // Handle network errors and other axios errors
    if (error.code === "ECONNABORTED") {
      error.message = "Request timeout - the server took too long to respond";
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      error.message = "Network error - could not connect to server";
    }
    return Promise.reject(error);
  }
);
