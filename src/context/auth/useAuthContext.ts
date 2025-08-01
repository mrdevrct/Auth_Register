// src/context/useAuthContext.ts
import type { UserData } from "@/features/auth/types";
import { useContext } from "react";
import { AuthContext } from "./authContext";

interface AuthContextType {
  userData: UserData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext باید داخل AuthProvider استفاده شود");
  }
  return context;
};
