import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: "https://nextrek-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

/**
 * Request interceptor to attach JWT token from localStorage
 */
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Could not access localStorage for token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling and token refresh
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) {
        console.warn("Could not clear localStorage");
      }
      // Optionally redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Log error for debugging
    const errorMessage = (error.response?.data as any)?.message || error.message;
    console.error("API Error:", {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    });

    return Promise.reject(error);
  }
);

export default apiClient;