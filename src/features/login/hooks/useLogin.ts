import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/libs/axios/axiosConfig";
import type { OTPResponse } from "../types";
import { loginApi } from "../api/loginApi";

export const useLogin = () => {
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(300);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const api = useApiClient();

  const LAST_OTP_TIME_KEY = `otp_last_sent_${mobile}`;
  const COUNTDOWN_KEY = `otp_countdown_${mobile}`;

  // بررسی زمان ذخیره‌شده در localStorage
  useEffect(() => {
    const lastOtpTime = localStorage.getItem(LAST_OTP_TIME_KEY);
    if (lastOtpTime) {
      const timePassed = Math.floor(
        (Date.now() - parseInt(lastOtpTime)) / 1000
      );
      const remainingTime = 300 - timePassed;
      if (remainingTime > 0) {
        setIsOtpSent(true);
        setCountdown(remainingTime);
        setIsResendEnabled(false);
      } else {
        setIsOtpSent(false);
        setIsResendEnabled(true);
        localStorage.removeItem(LAST_OTP_TIME_KEY);
        localStorage.removeItem(COUNTDOWN_KEY);
      }
    }
  }, [LAST_OTP_TIME_KEY, mobile]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          localStorage.setItem(COUNTDOWN_KEY, newCountdown.toString());
          if (newCountdown <= 0) {
            setIsResendEnabled(true);
            localStorage.removeItem(LAST_OTP_TIME_KEY);
            localStorage.removeItem(COUNTDOWN_KEY);
            return 0;
          }
          return newCountdown;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown, COUNTDOWN_KEY]);

  // Format countdown time
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Mutation for requesting OTP
  const requestOtpMutation = useMutation<OTPResponse, Error, string>({
    mutationFn: async (mobile: string) => {
      const response = await loginApi.sendOtpRequest(api, mobile);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setSuccessMessage(data.message || "کد تأیید ارسال شد.");
        setIsOtpSent(true);
        setCountdown(300);
        setIsResendEnabled(false);
        localStorage.setItem(LAST_OTP_TIME_KEY, Date.now().toString());
        localStorage.setItem(COUNTDOWN_KEY, "300");
      } else {
        setError(data.message || "خطایی در ارسال کد تأیید رخ داد.");
      }
    },
    onError: (error) => {
      setError(error.message || "خطایی در ارتباط با سرور رخ داد.");
    },
  });

  // Mutation for verifying OTP
  const verifyOtpMutation = useMutation<
    OTPResponse,
    Error,
    { mobile: string; otp: string }
  >({
    mutationFn: async ({ mobile, otp }) => {
      const response = await loginApi.verifyOtpRequest(api, mobile, otp);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setSuccessMessage("تأیید با موفقیت انجام شد!");
        if (data.token) {
          Cookies.set("auth_token", data.token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
          });
        }
        localStorage.removeItem(LAST_OTP_TIME_KEY);
        localStorage.removeItem(COUNTDOWN_KEY);
        navigate("/");
      } else {
        setError(data.message || "کد تأیید نامعتبر است.");
      }
    },
    onError: (error) => {
      setError(error.message || "خطایی در تأیید کد رخ داد.");
    },
  });

  // Handle OTP request
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    requestOtpMutation.mutate(mobile);
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    verifyOtpMutation.mutate({ mobile, otp });
  };

  return {
    mobile,
    setMobile,
    otp,
    setOtp,
    isOtpSent,
    error,
    successMessage,
    countdown,
    isResendEnabled,
    isLoading: requestOtpMutation.isPending || verifyOtpMutation.isPending,
    handleRequestOtp,
    handleVerifyOtp,
    formatTime,
  };
};
