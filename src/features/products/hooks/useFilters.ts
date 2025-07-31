import { useState } from "react";
import type { Filters } from "../types";
const defaultPageSize = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 8;

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    category: "",
    sort: "",
    minPrice: 0,
    maxPrice: 1000000,
    per_page: defaultPageSize,
  });
  const [tempPriceRange, setTempPriceRange] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 1000000 });

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

  return {
    filters,
    tempPriceRange,
    handlePriceChange,
    applyPriceFilters,
    handleFilterChange,
    handlePageChange,
  };
};