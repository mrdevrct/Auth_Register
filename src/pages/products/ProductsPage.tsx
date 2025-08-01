import React, { Suspense, lazy } from "react";
import { useFilters } from "@/features/products/hooks/useFilters";
import PageHeader from "@/components/page-header/PageHeader";
import { FiltersSidebarSkeleton } from "@/features/products/components/FiltersSidebar";
import { SortControlsSkeleton } from "@/features/products/components/SortControls";
import { ProductCardSkeleton } from "@/features/products/components/ProductCard";
const defaultPageSize = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 8;

// Dynamic imports
const ProductsContent = lazy(
  () => import("@/features/products/components/ProductsContent")
);


const ProductsPage: React.FC = () => {
  const {
    filters,
    tempPriceRange,
    handlePriceChange,
    applyPriceFilters,
    handleFilterChange,
    handlePageChange,
  } = useFilters();

  return (
    <div className="flex-grow flex flex-col bg-gray-100 p-4">
      <Suspense
        fallback={
          <div className="container mx-auto py-8">
            <PageHeader title="محصولات فروشگاه" pageLink="/products" />
            <div className="flex flex-col lg:flex-row gap-6">
              <FiltersSidebarSkeleton />
              <div className="w-full lg:w-4/5">
                <SortControlsSkeleton />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center min-h-[600px]">
                  {Array.from({ length: defaultPageSize }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ProductsContent
          filters={filters}
          tempPriceRange={tempPriceRange}
          handlePriceChange={handlePriceChange}
          applyPriceFilters={applyPriceFilters}
          handleFilterChange={handleFilterChange}
          handlePageChange={handlePageChange}
        />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
