import React from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useFilters } from "@/features/products/hooks/useFilters";
import { FiltersSidebar } from "@/features/products/components/FiltersSidebar";
import { SortControls } from "@/features/products/components/SortControls";
import { ProductCard, ProductCardSkeleton } from "@/features/products/components/ProductCard";
import { Pagination } from "@/components/pagination/Pagination";
import Animate from "@/components/animate/Animate";
import PageHeader from "@/components/page-header/PageHeader";

interface ProductsContentProps {
  filters: ReturnType<typeof useFilters>["filters"];
  tempPriceRange: ReturnType<typeof useFilters>["tempPriceRange"];
  handlePriceChange: ReturnType<typeof useFilters>["handlePriceChange"];
  applyPriceFilters: ReturnType<typeof useFilters>["applyPriceFilters"];
  handleFilterChange: ReturnType<typeof useFilters>["handleFilterChange"];
  handlePageChange: ReturnType<typeof useFilters>["handlePageChange"];
}

const ProductsContent: React.FC<ProductsContentProps> = ({
  filters,
  tempPriceRange,
  handlePriceChange,
  applyPriceFilters,
  handleFilterChange,
  handlePageChange,
}) => {
  const { data, loading, error } = useProducts(filters);

  return (
    <Animate
      animation="bottomToTop"
      duration={0.5}
      className="container mx-auto py-8"
    >
      <PageHeader title="محصولات فروشگاه" pageLink="/products" />
      <div className="flex flex-col lg:flex-row gap-6">
        <FiltersSidebar
          filters={filters}
          tempPriceRange={tempPriceRange}
          handlePriceChange={handlePriceChange}
          applyPriceFilters={applyPriceFilters}
          handleFilterChange={handleFilterChange}
        />
        <div className="w-full lg:w-4/5">
          <SortControls
            filters={filters}
            totalProducts={data?.pagination?.total_products || 0}
            onSortChange={(sort) => handleFilterChange({ sort })}
          />
          {error ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-red-500">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center min-h-[600px]">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : !data || !data.products.length ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  محصولی یافت نشد
                </div>
              ) : (
                data.products.map((product, index) => (
                  <Animate
                    key={product.id}
                    animation="bottomToTop"
                    duration={0.5}
                    delay={index * 0.1}
                  >
                    <ProductCard product={product} isPriority={index < 8} />
                  </Animate>
                ))
              )}
            </div>
          )}
          {data && data.pagination && data.pagination.total_pages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={filters.page}
                totalPages={data.pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </Animate>
  );
};

export default ProductsContent;