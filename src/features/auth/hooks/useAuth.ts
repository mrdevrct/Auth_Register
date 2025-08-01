import { useMemo } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/libs/axios/axiosConfig";
import type { UserData } from "../types";
import { authApi } from "../api/authApi";

export const useAuth = () => {
  const api = useApiClient();

  const { data: userData, isLoading } = useQuery<UserData | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await authApi.getCurrentUser(api);
        console.log("Auth response =>", response);

        if (response.data.success) {
          return response.data.user;
        }
        return null; // در صورت عدم موفقیت
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
        return null;
      }
    },
    enabled: !!Cookies.get("auth_token"),
  });

  const isLoggedIn = useMemo(
    () => !!userData && !!Cookies.get("auth_token"),
    [userData]
  );

  return { userData: userData || null, isLoggedIn, isLoading };
};
