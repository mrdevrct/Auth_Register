import React from "react";
import type { Filters } from "../types";
import Animate from "@/components/animate/Animate";

interface SortControlsProps {
  filters: Filters;
  totalProducts: number;
  onSortChange: (sort: Filters["sort"]) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  filters,
  totalProducts,
  onSortChange,
}) => {
  return (
    <Animate animation="fadeIn" duration={0.5} className="mb-6">
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          نمایش {(filters.page - 1) * (filters.per_page || 12) + 1}-
          {Math.min(
            filters.page * (filters.per_page || 12),
            totalProducts || 0
          )}{" "}
          از {totalProducts || 0} محصول
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-600">
            مرتب‌سازی:
          </label>
          <select
            id="sort"
            value={filters.sort || ""}
            onChange={(e) => onSortChange(e.target.value as Filters["sort"])}
            className="border border-gray-300 text-gray-600 p-2 rounded"
          >
            <option value="">پیش‌فرض</option>
            <option value="latest">آخرین محصولات</option>
            <option value="bestselling">پرفروش‌ترین‌ها</option>
            <option value="popular">محبوب‌ترین‌ها</option>
          </select>
        </div>
      </div>
    </Animate>
  );
};

const SortControlsSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col sm:flex-row justify-between items-center animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3 sm:mb-0"></div>
      <div className="h-10 w-32 bg-gray-200 rounded"></div>
    </div>
  );
};

export { SortControls, SortControlsSkeleton };
