"use client";

import { useCart } from "./CartProvider";

interface Props {
  productId: number;
}

export default function AddToCart({ productId }: Props) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.includes(productId);

  return (
    <button
      onClick={() => addToCart(productId)}
      disabled={isInCart}
      className={`w-full py-2 rounded-lg font-medium
        transition-all mt-3
        ${
          isInCart
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
      {isInCart ? "✅ Added" : "Add to Cart"}
    </button>
  );
}
