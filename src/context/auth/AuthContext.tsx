import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserData } from "@/features/auth/types";
import { createContext, type ReactNode } from "react";

interface AuthContextType {
  userData: UserData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userData, isLoggedIn, isLoading } = useAuth();
  console.log("Auth Context");
  

  return (
    <AuthContext.Provider value={{ userData, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
