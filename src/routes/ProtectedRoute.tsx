import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { decryptData } from "../libs/crypto/cryptoUtils";

const ProtectedRoute: React.FC = () => {
  const authToken = Cookies.get("auth_token");
  const encryptedUserData = Cookies.get("user_data");
  const userData = encryptedUserData ? decryptData(encryptedUserData) : null;
  const isAuthenticated = !!(authToken && userData);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
