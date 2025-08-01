export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number | null;
  image: false | string; // اگر false یا یک URL باشه
  gallery_images: string[];
  categories: Category[];
  tags: Tag[];
  attributes: Attribute[];
  variations: Variation[];
  reviews: Review[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  id?: number;
  name?: string;
  options?: string[];
}

export interface Variation {
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // می‌تونی دقیق‌ترش کنی اگر نمونه واقعی داری
}

export interface Review {
  author_name: string;
  rating: number;
  review: string;
}
