import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "../types";
import ImagePlaceholderIcon from "@/components/image/ImagePlaceholderIcon";

interface ProductCardProps {
  product: Product;
  isPriority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isPriority }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isAdding, addError } = useCart();

  const increaseQuantity = () => setQuantity((prev) => Math.max(1, prev + 1));
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
  };

  return (
    <div className="w-full lg:h-[400px] p-[15px] shadow-md bg-white rounded-lg flex flex-col gap-1">
      <a
        href={`/product/${product.id}`}
        className="relative w-full h-[200px] mb-2 mx-auto block"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading={isPriority ? "eager" : "lazy"}
            className="object-cover rounded-md w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
            <ImagePlaceholderIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </a>
      <a href={`/product/${product.id}`}>
        <h3 className="text-sm font-semibold text-center line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </a>
      <span className="text-blue-600 text-md font-bold text-center my-2">
        {parseInt(String(product.price)).toLocaleString("fa-IR")} تومان
      </span>
      {addError && (
        <div className="text-red-500 text-sm text-center mb-2">{addError}</div>
      )}
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="flex items-center rounded-md bg-white overflow-hidden border border-gray-200">
          <button
            onClick={decreaseQuantity}
            className="px-3 py-1 text-lg hover:bg-gray-100 border-l border-gray-200 bg-white"
            disabled={isAdding}
          >
            -
          </button>
          <span className="px-3 py-1 bg-white w-8 text-center text-sm">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="px-3 py-1 text-lg hover:bg-gray-100 border-r border-gray-200 bg-white"
            disabled={isAdding}
          >
            +
          </button>
        </div>
      </div>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        <FaShoppingCart className="h-5 w-5" />
        {isAdding ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </Button>
    </div>
  );
};

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-full lg:h-[400px] p-[15px] shadow-md bg-white rounded-lg flex flex-col gap-1 animate-pulse">
      <div className="w-full h-[200px] bg-gray-200 rounded-md mb-2"></div>
      <div className="h-5 bg-gray-200 rounded mx-auto w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded mx-auto w-1/2 my-2"></div>
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

export { ProductCard, ProductCardSkeleton };
