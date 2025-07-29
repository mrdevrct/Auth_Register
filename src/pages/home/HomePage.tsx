import React from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";

const HomePage: React.FC = () => {
  const { userData, isLoggedIn } = useAuth();

  console.log("user =>", userData);

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          خوش آمدید به صفحه اصلی!
        </h1>
        {isLoggedIn && userData ? (
          <p className="mt-4 text-lg text-gray-600">
            سلام، {userData.display_name || "کاربر"}!
          </p>
        ) : (
          <p className="mt-4 text-lg text-red-600">داده‌های کاربر یافت نشد.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
