import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/features/products/api/productsApi";
import type { Filters, ProductsResponse } from "@/features/products/types";
import type { CategoriesResponse } from "@/features/categories/types";
import { categoriesApi } from "@/features/categories/api/categoriesApi";
import { defaultCategories } from "@/constants/defaultCategories";
import { useApiClient } from "@/libs/axios/axiosConfig";

export const useProducts = (filters: Filters) => {
  const api = useApiClient();

  const productsQuery = useQuery<ProductsResponse, Error>({
    queryKey: ["products", filters],
    queryFn: () =>
      productsApi.getProducts(api, filters).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });

  const categoriesQuery = useQuery<CategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: () =>
      categoriesApi
        .getCategories(api, { page: 1, per_page: 100 })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1000, // ۱ ساعت
    placeholderData: {
      categories: defaultCategories,
      total: defaultCategories.length,
    },
  });

  return {
    products: productsQuery.data,
    productsLoading: productsQuery.isLoading,
    productError: productsQuery.error?.message,
    categories: categoriesQuery.data?.categories || defaultCategories,
    categoriesLoading: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error?.message,
  };
};
