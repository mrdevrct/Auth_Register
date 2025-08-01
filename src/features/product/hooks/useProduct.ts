import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/productApi";
import { useApiClient } from "@/libs/axios/axiosConfig";
import type { Product } from "../types";

export const useProduct = (id: string) => {
  const api = useApiClient();

  const productQuery = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => productApi.getSingleProduct(api, id).then((res) => res.data),
    staleTime: 5 * 60 * 1000, // ۵ دقیقه
  });

  return {
    data: productQuery.data,
    loading: productQuery.isLoading,
    error: productQuery.error?.message,
  };
};
