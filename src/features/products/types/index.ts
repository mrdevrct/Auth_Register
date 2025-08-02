export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export type CategoriesFilters = {
  page?: number;
  per_page?: number;
};


export interface Pagination {
  total_products: number;
  total_pages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export interface Filters {
  page: number;
  category: string;
  sort: "latest" | "bestselling" | "popular" | "";
  minPrice: number;
  maxPrice: number;
  per_page: number;
  count?: number;
}


