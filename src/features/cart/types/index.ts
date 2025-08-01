export interface CartItemType {
  cart_item_key: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  name: string;
  price: string;
  subtotal: string;
  image: string;
}

export interface CartAddResponse {
  success: boolean;
  message?: string;
  cart_items: CartItemType[];
  cart_total: string;
  cart_subtotal: string;
  cart_contents_count: number;
}
