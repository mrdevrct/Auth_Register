import type { AxiosInstance } from "axios";
import type { CategoriesResponse, CategoriesFilters } from "../types";

export const categoriesApi = {
  getCategories: (api: AxiosInstance, filters: CategoriesFilters) =>
    api.get<CategoriesResponse>("/wp-json/custom/v1/product-categories", {
      params: {
        page: filters.page,
        per_page: filters.per_page,
      },
    }),
};
