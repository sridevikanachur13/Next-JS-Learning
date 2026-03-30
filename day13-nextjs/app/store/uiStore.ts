import { create } from "zustand";

interface UIStore {
  theme: "light" | "dark";
  searchQuery: string;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  theme: "light",
  searchQuery: "",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
