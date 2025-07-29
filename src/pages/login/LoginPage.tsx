import React from "react";
import { motion } from "framer-motion";
import { useLogin } from "../../features/login/hooks/useLogin";
import RequestOtpForm from "../../features/login/components/RequestOtpForm";
import OtpForm from "../../features/login/components/OtpForm";

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

  const messageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
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
      </motion.div>
    </div>
  );
};

export default LoginPage;
