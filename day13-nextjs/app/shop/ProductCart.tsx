"use client";

import { useCartStore } from "../store/cartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const isInCart = items.some((item) => item.id === product.id);

  return (
    <div
      className="border rounded-xl overflow-hidden
      hover:shadow-lg transition-shadow bg-white"
    >
      <div
        className="h-48 flex items-center 
        justify-center p-4 bg-gray-50"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <div className="p-4">
        <span
          className="text-xs text-blue-500 
          uppercase font-medium"
        >
          {product.category}
        </span>
        <h3
          className="font-semibold text-sm mt-1 mb-2
          line-clamp-2 min-h-10"
        >
          {product.title}
        </h3>
        <p className="text-xl font-bold text-green-600 mb-3">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() =>
            addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            })
          }
          className={`w-full py-2 rounded-lg font-medium
            transition-all text-sm
            ${
              isInCart
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {isInCart ? "✅ In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
