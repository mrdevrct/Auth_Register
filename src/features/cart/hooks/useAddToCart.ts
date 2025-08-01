import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useApiClient } from "@/libs/axios/axiosConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cartApi } from "../api/cartApi";

export const useAddToCart = () => {
  const api = useApiClient();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => cartApi.addToCart(api, productId, quantity),
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
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

  const addToCart = async (productId: number, quantity: number) => {
    if (!isLoggedIn) {
      await Swal.fire({
        title: "باید لاگین کنید",
        html: `<p class="text-gray-600 mb-6">برای افزودن محصول به سبد خرید، باید وارد حساب کاربری خود شوید.</p>`,
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
      return { success: false, message: "نیاز به لاگین" };
    }

    try {
      const response = await mutation.mutateAsync({ productId, quantity });
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || "محصول به سبد خرید اضافه شد",
          cartItems: response.data.cart_items,
          cartTotal: response.data.cart_total,
          cartSubtotal: response.data.cart_subtotal,
          cartContentsCount: response.data.cart_contents_count,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "خطا در افزودن به سبد خرید",
        };
      }
    } catch {
      return { success: false, message: "خطا در ارتباط با سرور" };
    }
  };

  return {
    addToCart,
    isAdding: mutation.isPending,
    error: mutation.error?.message || null,
  };
};
