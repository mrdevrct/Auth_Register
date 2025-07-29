import { useMemo } from "react";
import Cookies from "js-cookie";
import { decryptData } from "../../../libs/crypto/cryptoUtils";
import type { UserData } from "../types";

export const useAuth = () => {
  const encryptedUserData = Cookies.get("user_data");
  const authToken = Cookies.get("auth_token");

  const userData: UserData | null = useMemo(() => {
    if (encryptedUserData) {
      try {
        return decryptData(encryptedUserData) as UserData;
      } catch (error) {
        console.error("Error decrypting user data:", error);
        return null;
      }
    }
    return null;
  }, [encryptedUserData]);

  const isLoggedIn = useMemo(
    () => !!(authToken && userData),
    [authToken, userData]
  );

  return { userData, isLoggedIn };
};
