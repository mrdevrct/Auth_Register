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
