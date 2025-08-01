import type { AxiosInstance } from "axios";
import type { Product } from "../types";

export const productApi = {
  getSingleProduct: (api: AxiosInstance, id: number | string) =>
    api.get<Product>(`/wp-json/custom/v1/product/${id}`),
};
