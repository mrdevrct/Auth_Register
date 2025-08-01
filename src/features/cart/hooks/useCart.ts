import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "@/libs/axios/axiosConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Swal from "sweetalert2";
import { cartApi } from "../api/cartApi";
import type { CartAddResponse, CartItemType } from "../types";
import type { AxiosResponse } from "axios";

export const useCart = () => {
  const api = useApiClient();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<
    AxiosResponse<CartAddResponse>,
    Error,
    {
      cart: CartItemType[];
      cartTotal: string;
      cartSubtotal: string;
      cartContentsCount: number;
    }
  >({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!isLoggedIn) {
        throw new Error("نیاز به لاگین");
      }
      return cartApi.getCart(api);
    },
    select: (response) => ({
      cart: response.data.cart_items,
      cartTotal: response.data.cart_total,
      cartSubtotal: response.data.cart_subtotal,
      cartContentsCount: response.data.cart_contents_count,
    }),
    enabled: isLoggedIn,
  });

  // Handle error state
  if (error?.message === "نیاز به لاگین") {
    Swal.fire({
      title: "باید لاگین کنید",
      html: `<p class="text-gray-600 mb-6">برای مشاهده سبد خرید، باید وارد حساب کاربری خود شوید.</p>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "بستن",
      confirmButtonText: "ورود",
      customClass: {
        container: "font-sans",
        title: "text-xl font-semibold text-gray-800 mb-4",
        actions: "flex justify-end gap-4",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        cancelButton:
          "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login");
      }
    });
  }

  const updateMutation = useMutation({
    mutationFn: ({
      cartItemKey,
      quantity,
    }: {
      cartItemKey: string;
      quantity: number;
    }) => cartApi.updateCartItem(api, cartItemKey, quantity),
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.setQueryData(["cart"], data);
        Swal.fire({
          title: "به‌روزرسانی موفق",
          html: `<p class="text-gray-600 mb-6">تعداد محصول در سبد خرید به‌روزرسانی شد.</p>`,
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            container: "font-sans",
            title: "text-xl font-semibold text-gray-800 mb-4",
            confirmButton:
              "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "خطا",
          html: `<p class="text-gray-600 mb-6">${
            data.data.message || "خطا در به‌روزرسانی سبد خرید"
          }</p>`,
          icon: "error",
          confirmButtonText: "باشه",
          customClass: {
            container: "font-sans",
            title: "text-xl font-semibold text-gray-800 mb-4",
            confirmButton:
              "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          },
          buttonsStyling: false,
        });
      }
    },
    onError: () => {
      Swal.fire({
        title: "خطا",
        html: `<p class="text-gray-600 mb-6">خطا در ارتباط با سرور</p>`,
        icon: "error",
        confirmButtonText: "باشه",
        customClass: {
          container: "font-sans",
          title: "text-xl font-semibold text-gray-800 mb-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemKey: string) =>
      cartApi.removeCartItem(api, cartItemKey),
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.setQueryData(["cart"], data);
      }
    },
    onError: () => {
      Swal.fire({
        title: "خطا",
        html: `<p class="text-gray-600 mb-6">خطا در ارتباط با سرور</p>`,
        icon: "error",
        confirmButtonText: "باشه",
        customClass: {
          container: "font-sans",
          title: "text-xl font-semibold text-gray-800 mb-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      });
    },
  });

  const updateCartItem = async (cartItemKey: string, quantity: number) => {
    if (!isLoggedIn) {
      await Swal.fire({
        title: "باید لاگین کنید",
        html: `<p class="text-gray-600 mb-6">برای به‌روزرسانی سبد خرید، باید وارد حساب کاربری خود شوید.</p>`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "بستن",
        confirmButtonText: "ورود",
        customClass: {
          container: "font-sans",
          title: "text-xl font-semibold text-gray-800 mb-4",
          actions: "flex justify-end gap-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          cancelButton:
            "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }
    if (quantity >= 1) {
      await updateMutation.mutateAsync({ cartItemKey, quantity });
    }
  };

  const removeCartItem = async (cartItemKey: string, productName: string) => {
    if (!isLoggedIn) {
      await Swal.fire({
        title: "باید لاگین کنید",
        html: `<p class="text-gray-600 mb-6">برای حذف آیتم از سبد خرید، باید وارد حساب کاربری خود شوید.</p>`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "بستن",
        confirmButtonText: "ورود",
        customClass: {
          container: "font-sans",
          title: "text-xl font-semibold text-gray-800 mb-4",
          actions: "flex justify-end gap-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          cancelButton:
            "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }

    const result = await Swal.fire({
      title: "حذف محصول",
      html: `<p class="text-gray-600 mb-6">آیا مطمئن هستید که می‌خواهید "${productName}" را از سبد خرید حذف کنید؟</p>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonText: "حذف",
      customClass: {
        container: "font-sans",
        title: "text-xl font-semibold text-gray-800 mb-4",
        actions: "flex justify-end gap-4",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md",
        cancelButton:
          "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      await removeMutation.mutateAsync(cartItemKey);
      await Swal.fire({
        title: "حذف موفق",
        html: `<p class="text-gray-600 mb-6">"${productName}" از سبد خرید حذف شد.</p>`,
        icon: "success",
        confirmButtonText: "باشه",
        customClass: {
          container: "font-sans",
          title: "text-xl font-semibold text-gray-800 mb-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      });
    }
  };

  return {
    cart: data?.cart ?? [],
    cartTotal: data?.cartTotal ?? "",
    cartSubtotal: data?.cartSubtotal ?? "",
    cartContentsCount: data?.cartContentsCount ?? 0,
    isLoading,
    error: error?.message ?? null,
    updateCartItem,
    removeCartItem,
  };
};
