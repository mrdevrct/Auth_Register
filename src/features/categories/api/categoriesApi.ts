import type { AxiosInstance } from "axios";
import type { CategoriesResponse } from "../types";
import type { Filters } from "@/features/products/types";

export const categoriesApi = {
  getCategories: (api: AxiosInstance, filters: Filters) =>
    api.get<CategoriesResponse>("/wp-json/custom/v1/product-categories", {
      params: {
        page: filters.page,
        per_page: filters.per_page,
      },
    }),
};
