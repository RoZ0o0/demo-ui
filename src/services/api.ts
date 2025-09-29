import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.error ||
        error.response?.data.message ||
        error.response?.statusText ||
        "Unexpected error occurred";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
)

export default api;