import type { AxiosInstance } from "axios";
import type { CartAddResponse } from "../types";

export const cartApi = {
  addToCart: async (
    api: AxiosInstance,
    productId: number,
    quantity: number
  ) => {
    return api.post<CartAddResponse>("/wp-json/custom/v1/cart/add", {
      product_id: productId,
      quantity,
    });
  },

  getCart: async (api: AxiosInstance) => {
    return api.get<CartAddResponse>("/wp-json/custom/v1/cart");
  },

  updateCartItem: async (
    api: AxiosInstance,
    cartItemKey: string,
    quantity: number
  ) => {
    return api.put<CartAddResponse>("/wp-json/custom/v1/cart/update", {
      cart_item_key: cartItemKey,
      quantity,
    });
  },

  removeCartItem: async (api: AxiosInstance, cartItemKey: string) => {
    return api.delete<CartAddResponse>("/wp-json/custom/v1/cart/remove", {
      data: { cart_item_key: cartItemKey },
    });
  },
};
