/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zarfmadaen.ir";

console.log("API_BASE_URL =>", API_BASE_URL);

// Create an authenticated API client using token from cookies
export const createApiClient = () => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use((config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

// Hook to get API client instance
export const useApiClient = () => {
  return createApiClient();
};
