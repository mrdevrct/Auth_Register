import type { AxiosInstance } from "axios";

// User API methods
export const authApi = {
  getCurrentUser: (api: AxiosInstance) => api.get("/wp-json/custom/v1/me"),
};
