import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

interface OTPResponse {
  success: boolean;
  message: string;
}

const LoginPage: React.FC = () => {
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes in seconds
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Base API URL from .env
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // کلیدهای localStorage
  const LAST_OTP_TIME_KEY = `otp_last_sent_${mobile}`;
  const COUNTDOWN_KEY = `otp_countdown_${mobile}`;

  // بررسی زمان ذخیره‌شده در localStorage هنگام بارگذاری صفحه
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
      const response = await axios.post<OTPResponse>(
        `${API_BASE_URL}/wp-json/custom/v1/otp/request`,
        { mobile },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setIsOtpSent(true);
        setCountdown(300);
        setIsResendEnabled(false);
        // ذخیره زمان ارسال OTP و شمارش معکوس در localStorage
        localStorage.setItem(LAST_OTP_TIME_KEY, Date.now().toString());
        localStorage.setItem(COUNTDOWN_KEY, "300");
      } else {
        setError("خطایی در ارسال کد تأیید رخ داد.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data?.message || "خطایی در ارتباط با سرور رخ داد."
        );
      } else {
        setError("خطایی در ارتباط با سرور رخ داد.");
      }
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
      const response = await axios.post<OTPResponse>(
        `${API_BASE_URL}/wp-json/custom/v1/otp/verify`,
        { mobile, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMessage("تأیید با موفقیت انجام شد!");
        // پاک کردن localStorage پس از تأیید موفق
        localStorage.removeItem(LAST_OTP_TIME_KEY);
        localStorage.removeItem(COUNTDOWN_KEY);
        // Handle successful login (e.g., redirect or update UI)
      } else {
        setError("کد تأیید نامعتبر است.");
      }
    } catch {
      setError("خطایی در تأیید کد رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  // انیمیشن برای ورودی‌ها
  const inputVariants: Variants = {
    hidden: (direction: string) => ({
      y: direction === "up" ? 50 : 0,
      x: direction === "right" ? 50 : 0,
      opacity: 0,
    }),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // انیمیشن برای پیام‌ها
  const messageVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // انیمیشن برای دکمه‌ها
  const buttonVariants: Variants = {
    idle: {
      scale: 1,
      backgroundColor: "#2563eb", // معادل bg-blue-600
      transition: { duration: 0.2 },
    },
    loading: {
      scale: 0.98,
      backgroundColor: "#1e3a8a", // معادل bg-blue-900 برای حالت تیره‌تر
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isOtpSent ? "تأیید کد" : "ورود / ثبت‌نام"}
        </h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            {error}
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            {successMessage}
          </motion.div>
        )}

        {!isOtpSent ? (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                شماره موبایل
              </label>
              <motion.input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="شماره را وارد کنید"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                dir="rtl"
                required
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom="up"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg flex items-center justify-center text-white ${
                isLoading ? "cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              variants={buttonVariants}
              animate={isLoading ? "loading" : "idle"}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
                  در حال ارسال...
                </>
              ) : (
                "ارسال کد تأیید"
              )}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                کد تأیید ارسال شده به {mobile}
              </label>
              <motion.input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="کد تأیید را وارد کنید"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                dir="rtl"
                required
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom="right"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg flex items-center justify-center text-white ${
                isLoading ? "cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              variants={buttonVariants}
              animate={isLoading ? "loading" : "idle"}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
                  در حال تأیید...
                </>
              ) : (
                "تأیید کد"
              )}
            </motion.button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                زمان باقی‌مانده برای ارسال مجدد: {formatTime(countdown)}
              </p>
              <button
                onClick={handleRequestOtp}
                disabled={!isResendEnabled || isLoading}
                className={`mt-2 text-blue-600 hover:underline ${
                  !isResendEnabled || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                ارسال مجدد کد
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
