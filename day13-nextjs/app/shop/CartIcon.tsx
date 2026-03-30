"use client";

import { useCartStore } from "../store/cartStore";

export default function CartIcon() {
  // ✅ Granular subscription
  // Only re-renders when getTotalItems result changes
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const count = getTotalItems();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-gray-100 rounded-lg"
    >
      <span className="text-2xl">🛒</span>
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500
          text-white text-xs rounded-full w-5 h-5
          flex items-center justify-center font-bold"
        >
          {count}
        </span>
      )}
    </button>
  );
}
