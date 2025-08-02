import type { AxiosInstance } from "axios";
import type { Filters, ProductsResponse } from "../types";

export const productsApi = {
  getProducts: (api: AxiosInstance, filters: Filters) => {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("type", filters.sort); // استفاده از type به جای sort
    if (filters.minPrice) params.set("min_price", filters.minPrice.toString());
    if (filters.maxPrice) params.set("max_price", filters.maxPrice.toString());
    if (filters.per_page) params.set("per_page", filters.per_page.toString());
    if (filters.count) params.set("count", filters.count.toString());

    return api.get<ProductsResponse>("/wp-json/custom/v1/products", { params });
  },
};