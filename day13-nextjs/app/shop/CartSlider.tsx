"use client";

import { useCartStore } from "../store/cartStore";

export default function CartSidebar() {
  // Granular subscriptions — each re-renders independently
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={toggleCart} />
      )}

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-96
    bg-white shadow-2xl z-50 flex flex-col
    transition-transform duration-300"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center
          p-6 border-b"
        >
          <h2 className="text-xl font-bold">🛒 Your Cart ({items.length})</h2>
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-gray-600
              text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🛍️</p>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 border 
                  rounded-xl items-start"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain
                    bg-gray-50 rounded-lg p-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium 
                    line-clamp-2 mb-2"
                  >
                    {item.title}
                  </p>
                  <p className="text-green-600 font-bold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-gray-100
                        hover:bg-gray-200 font-bold text-sm"
                    >
                      −
                    </button>
                    <span
                      className="text-sm font-medium w-4
                      text-center"
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gray-100
                        hover:bg-gray-200 font-bold text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-400
                        hover:text-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-3">
            <div
              className="flex justify-between 
              items-center font-bold text-lg"
            >
              <span>Total</span>
              <span className="text-green-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 bg-green-500
              text-white rounded-xl font-bold
              hover:bg-green-600 transition-colors"
            >
              Checkout →
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-red-400
                hover:text-red-600 text-sm"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
