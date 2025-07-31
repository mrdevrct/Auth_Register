import type { AxiosInstance } from "axios";

// User API methods
export const loginApi = {
  sendOtpRequest: (api: AxiosInstance, mobile: string) =>
    api.post("/wp-json/custom/v1/otp/request", { mobile }),
  verifyOtpRequest: (api: AxiosInstance, mobile: string, otp: string) =>
    api.post("/wp-json/custom/v1/otp/verify", { mobile, otp }),
};
