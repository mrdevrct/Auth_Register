import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/libs/axios/axiosConfig";
import { productsApi } from "../api/productsApi";
import type { Filters, ProductsResponse } from "../types";

export const useProducts = (filters: Filters) => {
  const api = useApiClient();

  const { data, isLoading, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const response = await productsApi.getProducts(api, filters);
      return response.data;
    },
  });

  return {
    data,
    loading: isLoading,
    error: error?.message,
  };
};
