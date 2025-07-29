import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import type { Variants } from "framer-motion";

interface OtpFormProps {
  mobile: string;
  otp: string;
  setOtp: (value: string) => void;
  handleVerifyOtp: (e: React.FormEvent) => void;
  handleRequestOtp: (e: React.FormEvent) => void;
  isLoading: boolean;
  isResendEnabled: boolean;
  countdown: number;
  formatTime: (seconds: number) => string;
}

const inputVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const buttonVariants: Variants = {
  idle: {
    scale: 1,
    backgroundColor: "#2563eb",
    transition: { duration: 0.2 },
  },
  loading: {
    scale: 0.98,
    backgroundColor: "#1e3a8a",
    transition: { duration: 0.2 },
  },
};

const OtpForm: React.FC<OtpFormProps> = ({
  mobile,
  otp,
  setOtp,
  handleVerifyOtp,
  handleRequestOtp,
  isLoading,
  isResendEnabled,
  countdown,
  formatTime,
}) => {
  return (
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
            !isResendEnabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ارسال مجدد کد
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
