import React from "react";
import { useLogin } from "@/features/login/hooks/useLogin";
import RequestOtpForm from "@/features/login/components/RequestOtpForm";
import OtpForm from "@/features/login/components/OtpForm";
import Animate from "@/components/animate/Animate";

const LoginPage: React.FC = () => {
  const {
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
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Animate
        animation="scaleUp"
        duration={0.5}
        delay={0.2}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {isOtpSent ? "تأیید کد" : "ورود / ثبت‌نام"}
        </h2>

        {error && (
          <Animate
            animation="fadeIn"
            duration={0.3}
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
          >
            {error}
          </Animate>
        )}
        {successMessage && (
          <Animate
            animation="fadeIn"
            duration={0.3}
            className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center"
          >
            {successMessage}
          </Animate>
        )}

        {!isOtpSent ? (
          <RequestOtpForm
            mobile={mobile}
            setMobile={setMobile}
            handleRequestOtp={handleRequestOtp}
            isLoading={isLoading}
          />
        ) : (
          <OtpForm
            mobile={mobile}
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            handleRequestOtp={handleRequestOtp}
            isLoading={isLoading}
            isResendEnabled={isResendEnabled}
            countdown={countdown}
            formatTime={formatTime}
          />
        )}
      </Animate>
    </div>
  );
};

export default LoginPage;
