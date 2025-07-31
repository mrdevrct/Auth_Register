import Animate from "@/components/animate/Animate";
import React from "react";
import { FaSpinner } from "react-icons/fa";

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
        <Animate
          animation="rightToLeft"
          duration={0.5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        >
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="کد تأیید را وارد کنید"
            dir="rtl"
            required
            className="w-full h-full bg-transparent outline-none"
          />
        </Animate>
      </div>
      <Animate
        animation="buttonScale"
        duration={0.2}
        animate={isLoading ? "loading" : "idle"}
        className={`w-full p-3 rounded-lg flex items-center justify-center text-white ${
          isLoading ? "cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-full bg-transparent flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
              در حال تأیید...
            </>
          ) : (
            "تأیید کد"
          )}
        </button>
      </Animate>
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