import React from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useFilters } from "@/features/products/hooks/useFilters";
import { FiltersSidebar } from "@/features/products/components/FiltersSidebar";
import { SortControls } from "@/features/products/components/SortControls";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/ProductCard";
import { Pagination } from "@/components/pagination/Pagination";
import PageHeader from "@/components/page-header/PageHeader";
import Animate from "@/components/animate/Animate";

const defaultPageSize = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 8;

interface ProductsContentProps {
  filters: ReturnType<typeof useFilters>["filters"];
  tempPriceRange: ReturnType<typeof useFilters>["tempPriceRange"];
  handlePriceChange: ReturnType<typeof useFilters>["handlePriceChange"];
  applyPriceFilters: ReturnType<typeof useFilters>["applyPriceFilters"];
  handleFilterChange: ReturnType<typeof useFilters>["handleFilterChange"];
  handlePageChange: ReturnType<typeof useFilters>["handlePageChange"];
  resetFilters: ReturnType<typeof useFilters>["resetFilters"];
}

const ProductsContent: React.FC<ProductsContentProps> = ({
  filters,
  tempPriceRange,
  handlePriceChange,
  applyPriceFilters,
  handleFilterChange,
  handlePageChange,
  resetFilters,
}) => {
  const {
    products,
    productsLoading,
    productError,
    categories,
    categoriesLoading,
    categoriesError,
  } = useProducts(filters);

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
          resetFilters={resetFilters}
          categories={categories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
        />
        <div className="w-full lg:w-4/5">
          <SortControls
            filters={filters}
            totalProducts={products?.pagination?.total_products || 0}
            onSortChange={(sort) => handleFilterChange({ sort })}
          />
          {productError ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-red-500">
              {productError}
            </div>
          ) : productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center min-h-[600px]">
              {Array.from({ length: defaultPageSize }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : !products || !products.products.length ? (
            <Animate animation="fadeIn" duration={0.5}>
              <div className="flex justify-center items-center">
                <div className="text-center w-full max-w-2xl">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    محصولی یافت نشد
                  </h2>
                </div>
              </div>
            </Animate>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center min-h-[600px]">
              {products.products.map((product, index) => (
                <Animate
                  key={product.id}
                  animation="bottomToTop"
                  duration={0.5}
                  delay={index * 0.1}
                >
                  <ProductCard product={product} isPriority={index < 8} />
                </Animate>
              ))}
            </div>
          )}
          {products &&
            products.pagination &&
            products.pagination.total_pages > 1 &&
            !filters.count && (
              <div className="mt-8">
                <Pagination
                  currentPage={filters.page}
                  totalPages={products.pagination.total_pages}
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
