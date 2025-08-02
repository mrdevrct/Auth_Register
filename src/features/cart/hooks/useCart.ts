import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/libs/axios/axiosConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cartApi } from "../api/cartApi";
import type { CartAddResponse, CartItemType } from "../types";
import type { AxiosResponse } from "axios";
import useSweetAlert from "@/libs/sweet-alert/sweetAlertHelper";

export const useCart = () => {
  const api = useApiClient();
  const { isLoggedIn } = useAuth();
  const { showAlert } = useSweetAlert();
  const queryClient = useQueryClient();

  // Query for fetching cart data
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

  // Handle login error for cart fetch
  if (error?.message === "نیاز به لاگین") {
    showAlert({
      title: "باید لاگین کنید",
      description: "برای مشاهده سبد خرید، باید وارد حساب کاربری خود شوید.",
      icon: "warning",
      confirmButton: {
        text: "ورود",
        className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        link: "/auth/login",
      },
      cancelButton: {
        text: "بستن",
        className: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
      },
    });
  }

  // Mutation for adding to cart
  const addMutation = useMutation({
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
      showAlert({
        title: "خطا",
        description: "خطا در ارتباط با سرور",
        icon: "error",
        confirmButton: {
          text: "باشه",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
      });
    },
  });

  // Mutation for updating cart item
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
        showAlert({
          title: "به‌روزرسانی موفق",
          description: "تعداد محصول در سبد خرید به‌روزرسانی شد.",
          icon: "success",
          confirmButton: {
            text: "باشه",
            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          },
        });
      } else {
        showAlert({
          title: "خطا",
          description: data.data.message || "خطا در به‌روزرسانی سبد خرید",
          icon: "error",
          confirmButton: {
            text: "باشه",
            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          },
        });
      }
    },
    onError: () => {
      showAlert({
        title: "خطا",
        description: "خطا در ارتباط با سرور",
        icon: "error",
        confirmButton: {
          text: "باشه",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
      });
    },
  });

  // Mutation for removing cart item
  const removeMutation = useMutation({
    mutationFn: (cartItemKey: string) =>
      cartApi.removeCartItem(api, cartItemKey),
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.setQueryData(["cart"], data);
      }
    },
    onError: () => {
      showAlert({
        title: "خطا",
        description: "خطا در ارتباط با سرور",
        icon: "error",
        confirmButton: {
          text: "باشه",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
      });
    },
  });

  // Add to cart function
  const addToCart = async (productId: number, quantity: number) => {
    if (!isLoggedIn) {
      await showAlert({
        title: "باید لاگین کنید",
        description: "برای افزودن محصول به سبد خرید، باید وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButton: {
          text: "ورود",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          link: "/auth/login",
        },
        cancelButton: {
          text: "بستن",
          className: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
        },
      });
      return { success: false, message: "نیاز به لاگین" };
    }

    try {
      const response = await addMutation.mutateAsync({ productId, quantity });
      if (response.data.success) {
        await showAlert({
          title: "موفق!",
          description: "محصول با موفقیت به سبد خرید اضافه شد.",
          icon: "success",
          confirmButton: {
            text: "رفتن به سبد خرید",
            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
            link: "/cart",
          },
          cancelButton: {
            text: "بستن",
            className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md",
          },
        });
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

  // Update cart item function
  const updateCartItem = async (cartItemKey: string, quantity: number) => {
    if (!isLoggedIn) {
      await showAlert({
        title: "باید لاگین کنید",
        description: "برای به‌روزرسانی سبد خرید، باید وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButton: {
          text: "ورود",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          link: "/auth/login",
        },
        cancelButton: {
          text: "بستن",
          className: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
        },
      });
      return;
    }
    if (quantity >= 1) {
      await updateMutation.mutateAsync({ cartItemKey, quantity });
    }
  };

  // Remove cart item function
  const removeCartItem = async (cartItemKey: string, productName: string) => {
    if (!isLoggedIn) {
      await showAlert({
        title: "باید لاگین کنید",
        description: "برای حذف آیتم از سبد خرید، باید وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButton: {
          text: "ورود",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
          link: "/auth/login",
        },
        cancelButton: {
          text: "بستن",
          className: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
        },
      });
      return;
    }

    const result = await showAlert({
      title: "حذف محصول",
      description: `آیا مطمئن هستید که می‌خواهید "${productName}" را از سبد خرید حذف کنید؟`,
      icon: "warning",
      confirmButton: {
        text: "حذف",
        className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md",
      },
      cancelButton: {
        text: "لغو",
        className: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      await removeMutation.mutateAsync(cartItemKey);
      await showAlert({
        title: "حذف موفق",
        description: `"${productName}" از سبد خرید حذف شد.`,
        icon: "success",
        confirmButton: {
          text: "باشه",
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        },
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
    addToCart,
    updateCartItem,
    removeCartItem,
    isAdding: addMutation.isPending,
    addError: addMutation.error?.message || null,
  };
};