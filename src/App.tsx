import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Base API URL from .env
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsResendEnabled(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

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
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post<OTPResponse>(
        `${API_BASE_URL}/wp-json/custom/v1/otp/verify`,
        { mobile, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMessage("تأیید با موفقیت انجام شد!");
        // Handle successful login (e.g., redirect or update UI)
      } else {
        setError("کد تأیید نامعتبر است.");
      }
    } catch {
      setError("خطایی در تأیید کد رخ داد.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isOtpSent ? "تأیید کد" : "ورود / ثبت‌نام"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        {!isOtpSent ? (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                شماره موبایل
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="شماره را وارد کنید"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="rtl"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ارسال کد تأیید
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                کد تأیید ارسال شده به {mobile}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="کد تأیید را وارد کنید"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="rtl"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              تأیید کد
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                زمان باقی‌مانده برای ارسال مجدد: {formatTime(countdown)}
              </p>
              <button
                onClick={handleRequestOtp}
                disabled={!isResendEnabled}
                className={`mt-2 text-blue-600 hover:underline ${
                  !isResendEnabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ارسال مجدد کد
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
