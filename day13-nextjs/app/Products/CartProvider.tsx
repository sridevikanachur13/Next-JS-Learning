"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  count: number;
  addToCart: (id: number) => void;
  cartItems: number[];
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<number[]>([]);

  function addToCart(id: number) {
    setCartItems((prev) => [...prev, id]);
  }

  return (
    <CartContext.Provider
      value={{
        count: cartItems.length,
        addToCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
