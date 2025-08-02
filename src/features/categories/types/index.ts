export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: string | null;
  parent: number;
  permalink: string;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export type CategoriesFilters = {
  page?: number;
  per_page?: number;
};
