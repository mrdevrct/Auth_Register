import axios from "axios";
import type { OTPResponse } from "../types";
import loginEndpoints from "../endpoints/loginEndpoints";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const requestOtp = async (mobile: string): Promise<OTPResponse> => {
  try {
    const response = await axios.post<OTPResponse>(
      `${API_BASE_URL}/${loginEndpoints.SEND_OTP_REQUEST}`,
      { mobile },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || "خطایی در ارتباط با سرور رخ داد."
      );
    }
    throw new Error("خطایی در ارتباط با سرور رخ داد.");
  }
};

export const verifyOtp = async (
  mobile: string,
  otp: string
): Promise<OTPResponse> => {
  try {
    const response = await axios.post<OTPResponse>(
      `${API_BASE_URL}/${loginEndpoints.VERIFY_OTP_REQUEST}`,
      { mobile, otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || "خطایی در ارتباط با سرور رخ داد."
      );
    }
    throw new Error("خطایی در تأیید کد رخ داد.");
  }
};
