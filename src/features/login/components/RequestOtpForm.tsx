import React from "react";
import { FaSpinner } from "react-icons/fa";
import Animate from "@/components/animate/Animate";

interface RequestOtpFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  handleRequestOtp: (e: React.FormEvent) => void;
  isLoading: boolean;
}

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
        <Animate
          animation="bottomToTop"
          duration={0.5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        >
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="شماره را وارد کنید"
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
              در حال ارسال...
            </>
          ) : (
            "ارسال کد تأیید"
          )}
        </button>
      </Animate>
    </form>
  );
};

export default RequestOtpForm;
