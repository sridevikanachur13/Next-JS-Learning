import { create } from "zustand";

// Types
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  // State
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  // Derived (computed from state)
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  // ── Initial State ──────────────────────────────
  items: [],
  isOpen: false,

  // ── Actions ────────────────────────────────────
  addItem: (newItem) => {
    const { items } = get(); // get() reads current state
    const existing = items.find((item) => item.id === newItem.id);

    if (existing) {
      // Already in cart — increase quantity
      set({
        items: items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      // New item — add with quantity 1
      set({ items: [...items, { ...newItem, quantity: 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      // Remove if quantity hits 0
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set({ isOpen: !get().isOpen }),

  // ── Derived Values ─────────────────────────────
  // These are FUNCTIONS not state
  // They compute from current state on demand
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
