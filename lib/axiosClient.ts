import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import http from "http";
import https from "https";

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
export const createBasicAuth = (username: string, password: string): string => {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return Buffer.from(`${username}:${password}`).toString("base64");
  } else {
    // Browser environment (fallback)
    return btoa(`${username}:${password}`);
  }
};

const basicAuth = createBasicAuth(AUTH_USERNAME, AUTH_PASSWORD);

// Create HTTP agents with improved timeout settings for Node.js
const createAgents = () => {
  if (typeof window !== "undefined") return {};
  
  return {
    httpAgent: new http.Agent({
      timeout: 90000, // 90 seconds connection timeout
      keepAlive: true,
      keepAliveMsecs: 60000,
      maxSockets: 50,
      maxFreeSockets: 10,
    }),
    httpsAgent: new https.Agent({
      timeout: 90000, // 90 seconds connection timeout
      keepAlive: true,
      keepAliveMsecs: 60000,
      maxSockets: 50,
      maxFreeSockets: 10,
    }),
  };
};

// Create axios instance with default config
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 90000, // 90 seconds request timeout
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
  ...createAgents(),
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

// Request interceptor for retry logic
axiosClient.interceptors.request.use(
  (config) => {
    // Add retry count to config if not present
    if (!(config as any).__retryCount) {
      (config as any).__retryCount = 0;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic for network errors
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
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & { __retryCount?: number };
    
    // Only retry on network errors and timeout errors
    const shouldRetry = 
      error.code === "ETIMEDOUT" ||
      error.code === "ECONNABORTED" ||
      error.code === "ECONNRESET" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      (error.response?.status && error.response.status >= 500);

    const retryCount = config?.__retryCount || 0;

    if (shouldRetry && retryCount < MAX_RETRIES && config) {
      config.__retryCount = retryCount + 1;
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      
      console.warn(
        `Request failed (${error.code || error.message}). Retrying (${retryCount + 1}/${MAX_RETRIES}) in ${delay}ms...`,
        { url: config.url }
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Retry the request
      return axiosClient(config);
    }

    // Handle network errors and other axios errors
    if (error.code === "ECONNABORTED") {
      error.message = "Request timeout - the server took too long to respond";
    } else if (error.code === "ETIMEDOUT") {
      error.message = "Connection timeout - could not establish connection to server";
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      error.message = "Network error - could not connect to server";
    } else if (error.code === "ECONNRESET") {
      error.message = "Connection was reset by the server";
    }

    // Log error for debugging
    console.error("Axios Error (final):", {
      code: error.code,
      message: error.message,
      url: config?.url,
      baseURL: config?.baseURL,
      retries: retryCount,
    });

    return Promise.reject(error);
  }
);
