"use client";

import { useCart } from "./CartProvider";

export default function CartSummary() {
  const { count, cartItems } = useCart();

  return (
    <div
      className="fixed top-4 right-4 bg-white 
      border-2 border-blue-400 rounded-xl p-4 shadow-lg"
    >
      <p className="font-bold text-lg">🛒 Cart</p>
      <p className="text-3xl font-bold text-blue-500">{count}</p>
      <p className="text-gray-500 text-sm">items</p>
    </div>
  );
}
