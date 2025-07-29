import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

interface RequestOtpFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  handleRequestOtp: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const inputVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
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

const RequestOtpForm: React.FC<RequestOtpFormProps> = ({
  mobile,
  setMobile,
  handleRequestOtp,
  isLoading,
}) => {
  return (
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
  );
};

export default RequestOtpForm;
