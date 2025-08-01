import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import type { Filters } from "../types";
import Animate from "@/components/animate/Animate";
import type { Category } from "@/features/categories/types";

interface FiltersSidebarProps {
  filters: Filters;
  tempPriceRange: { min: number; max: number };
  handlePriceChange: (type: "min" | "max", value: number) => void;
  applyPriceFilters: () => void;
  handleFilterChange: (newFilters: Partial<Filters>) => void;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError?: string;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  tempPriceRange,
  handlePriceChange,
  applyPriceFilters,
  handleFilterChange,
  categories,
  categoriesLoading,
  categoriesError,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.matchMedia("(min-width: 1024px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Animate animation="leftToRight" duration={0.5} className="w-full lg:w-1/5">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">فیلتر کردن</h2>
          <Button
            variant="ghost"
            className="p-2 h-6 w-6 lg:h-8 lg:w-8 lg:hidden" // مخفی کردن دکمه در lg و بالاتر
            onClick={toggleFilters}
            aria-label={isOpen ? "بستن فیلترها" : "باز کردن فیلترها"}
          >
            {isOpen ? (
              <FaChevronUp className="h-4 w-4 lg:h-5 lg:w-5" />
            ) : (
              <FaChevronDown className="h-4 w-4 lg:h-5 lg:w-5" />
            )}
          </Button>
        </div>

        {(isOpen || window.matchMedia("(min-width: 1024px)").matches) && (
          <Animate animation="fadeIn" duration={0.3}>
            <div>
              <div className="mb-6">
                <h3 className="font-medium mb-4">محدوده قیمت (تومان)</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      حداقل قیمت
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={tempPriceRange.max}
                      step="10000"
                      value={tempPriceRange.min}
                      onChange={(e) => {
                        const value = Math.min(
                          Number(e.target.value) || 0,
                          tempPriceRange.max - 10000
                        );
                        handlePriceChange("min", value);
                      }}
                      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      حداکثر قیمت
                    </label>
                    <input
                      type="number"
                      min={tempPriceRange.min}
                      max="1000000"
                      step="10000"
                      value={tempPriceRange.max}
                      onChange={(e) => {
                        const value = Math.max(
                          Number(e.target.value) || tempPriceRange.min + 10000,
                          tempPriceRange.min + 10000
                        );
                        handlePriceChange("max", value);
                      }}
                      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1,000,000"
                    />
                  </div>
                  <Button
                    onClick={applyPriceFilters}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    اعمال فیلتر
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="bg-white rounded-lg p-2">
                <h3 className="font-medium mb-2">دسته‌بندی محصولات</h3>
                {categoriesError ? (
                  <div className="text-red-500 text-sm">
                    خطا در بارگذاری دسته‌بندی‌ها
                  </div>
                ) : (
                  <select
                    value={filters.category || ""}
                    onChange={(e) =>
                      handleFilterChange({ category: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                    disabled={categoriesLoading}
                  >
                    <option value="">همه دسته‌ها</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
                {categoriesLoading && (
                  <div className="text-gray-500 text-sm mt-2">
                    در حال بارگذاری...
                  </div>
                )}
              </div>
            </div>
          </Animate>
        )}
      </div>
    </Animate>
  );
};

const FiltersSidebarSkeleton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full lg:w-1/5 bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
        <div
          className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full cursor-pointer lg:hidden"
          onClick={toggleFilters}
        ></div>
      </div>
      {isOpen && (
        <div>
          <div className="mb-6">
            <div className="h-5 bg-gray-200 rounded mb-4"></div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col">
                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded mt-4"></div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="bg-white rounded-lg p-2">
            <div className="h-5 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export { FiltersSidebar, FiltersSidebarSkeleton };
