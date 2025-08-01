import { useState } from "react";

export const useProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return { quantity, increaseQuantity, decreaseQuantity };
};
