import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { encryptData } from "../../../libs/crypto/cryptoUtils";
import { requestOtp, verifyOtp } from "../api/loginApi";

export const useLogin = () => {
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(300);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
  }, [LAST_OTP_TIME_KEY]);

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

  // Handle OTP request
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await requestOtp(mobile);
      if (response.success) {
        setSuccessMessage(response.message || "کد تأیید ارسال شد.");
        setIsOtpSent(true);
        setCountdown(300);
        setIsResendEnabled(false);
        localStorage.setItem(LAST_OTP_TIME_KEY, Date.now().toString());
        localStorage.setItem(COUNTDOWN_KEY, "300");
      } else {
        setError("خطایی در ارسال کد تأیید رخ داد.");
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await verifyOtp(mobile, otp);
      if (response.success) {
        setSuccessMessage("تأیید با موفقیت انجام شد!");
        if (response.token) {
          Cookies.set("auth_token", response.token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
          });
        }
        if (response.user) {
          const encryptedUserData = encryptData(response.user.wp_data);
          if (encryptedUserData) {
            Cookies.set("user_data", encryptedUserData, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
          } else {
            setError("خطا در رمزنگاری داده‌های کاربر.");
            return;
          }
        }
        localStorage.removeItem(LAST_OTP_TIME_KEY);
        localStorage.removeItem(COUNTDOWN_KEY);
        navigate("/");
      } else {
        setError("کد تأیید نامعتبر است.");
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
    handleRequestOtp,
    handleVerifyOtp,
    formatTime,
  };
};
