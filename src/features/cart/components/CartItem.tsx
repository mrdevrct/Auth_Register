import React from "react";
import { Button } from "@/components/ui/button";
import type { CartItemType } from "../types";
import { useCart } from "../hooks/useCart";
import Animate from "@/components/animate/Animate";
import ImagePlaceholderIcon from "@/components/image/ImagePlaceholderIcon";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { updateCartItem, removeCartItem } = useCart();

  const increaseQuantity = () =>
    updateCartItem(item.cart_item_key, item.quantity + 1);
  const decreaseQuantity = () =>
    updateCartItem(item.cart_item_key, Math.max(1, item.quantity - 1));

  // بررسی معتبر بودن تصویر
  const hasValidImage = item.image && item.image.trim() !== "";

  return (
    <Animate
      animation="bottomToTop"
      duration={0.5}
      delay={index * 0.1}
      className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4 mb-4"
    >
      <a
        href={`/products/${item.product_id}`}
        className="relative w-full sm:w-24 h-24 flex-shrink-0"
      >
        {hasValidImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="object-cover rounded-md w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
            <ImagePlaceholderIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </a>
      <div className="flex-grow flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col text-center sm:text-right">
          <a
            href={`/products/${item.product_id}`}
            className="text-sm font-semibold hover:text-blue-600 transition-colors"
          >
            {item.name}
          </a>
          <span className="text-blue-600 font-bold mt-1">
            {parseInt(item.price).toLocaleString("fa-IR")} تومان
          </span>
          <span className="text-gray-600 text-sm">
            جمع: {parseInt(item.subtotal).toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md bg-white border border-gray-200">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 text-lg hover:bg-gray-100 border-l border-gray-200"
            >
              -
            </button>
            <span className="px-3 py-1 w-8 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 text-lg hover:bg-gray-100 border-r border-gray-200"
            >
              +
            </button>
          </div>
          <Button
            onClick={() => removeCartItem(item.cart_item_key, item.name)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            حذف
          </Button>
        </div>
      </div>
    </Animate>
  );
};

export default CartItem;
