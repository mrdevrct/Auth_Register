import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Filters } from "../types";

const defaultPageSize = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 8;
const defaultMinPrice = 0;
const defaultMaxPrice = 1000000;

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters: Filters = {
    page: Number(searchParams.get("page")) || 1,
    category: searchParams.get("category") || "",
    sort:
      (searchParams.get("type") as "latest" | "bestselling" | "popular" | "") ||
      "",
    minPrice: Number(searchParams.get("min_price")) || defaultMinPrice,
    maxPrice: Number(searchParams.get("max_price")) || defaultMaxPrice,
    per_page: Number(searchParams.get("per_page")) || defaultPageSize,
    count: Number(searchParams.get("count")) || undefined,
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [tempPriceRange, setTempPriceRange] = useState<{
    min: number;
    max: number;
  }>({
    min: initialFilters.minPrice,
    max: initialFilters.maxPrice,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.page !== 1) params.set("page", filters.page.toString());
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("type", filters.sort);
    if (filters.minPrice !== defaultMinPrice)
      params.set("min_price", filters.minPrice.toString());
    if (filters.maxPrice !== defaultMaxPrice)
      params.set("max_price", filters.maxPrice.toString());
    if (filters.per_page !== defaultPageSize)
      params.set("per_page", filters.per_page.toString());
    if (filters.count) params.set("count", filters.count.toString());
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (type === "min") {
      setTempPriceRange((prev) => ({
        ...prev,
        min: Math.min(value, prev.max - 10000),
      }));
    } else {
      setTempPriceRange((prev) => ({
        ...prev,
        max: Math.max(value, prev.min + 10000),
      }));
    }
  };

  const applyPriceFilters = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: tempPriceRange.min,
      maxPrice: tempPriceRange.max,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // تابع جدید برای حذف تمام فیلترها
  const resetFilters = () => {
    const defaultFilters: Filters = {
      page: 1,
      category: "",
      sort: "",
      minPrice: defaultMinPrice,
      maxPrice: defaultMaxPrice,
      per_page: defaultPageSize,
      count: undefined,
    };
    setFilters(defaultFilters);
    setTempPriceRange({ min: defaultMinPrice, max: defaultMaxPrice });
    setSearchParams({}, { replace: true }); // پاک کردن تمام پارامترهای URL
  };

  return {
    filters,
    tempPriceRange,
    handlePriceChange,
    applyPriceFilters,
    handleFilterChange,
    handlePageChange,
    resetFilters,
  };
};