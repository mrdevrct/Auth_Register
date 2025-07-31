import type { AxiosInstance } from "axios";
import type { Filters, ProductsResponse } from "../types";

export const productsApi = {
  getProducts: (api: AxiosInstance, filters: Filters) =>
    api.get<ProductsResponse>("/wp-json/custom/v1/products", {
      params: {
        page: filters.page,
        category: filters.category,
        sort: filters.sort,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
        per_page: filters.per_page,
      },
    }),
};
