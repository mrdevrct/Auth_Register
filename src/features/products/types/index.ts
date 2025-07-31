export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Pagination {
  total_products: number;
  total_pages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface Filters {
  page: number;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  per_page?: number; 
}

export interface OTPResponse {
  success: boolean;
  message?: string;
  token?: string;
}
