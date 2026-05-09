import { create } from "zustand";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type WishlistStore = {
  items: WishlistItem[];
  loadWishlist: () => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

function saveToStorage(items: WishlistItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("rm-wishlist", JSON.stringify(items));
  }
}

function loadFromStorage(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("rm-wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  loadWishlist: () => {
    set({ items: loadFromStorage() });
  },

  addItem: (item) => {
    if (get().items.find((i) => i.id === item.id)) return;
    const newItems = [...get().items, item];
    set({ items: newItems });
    saveToStorage(newItems);
  },

  removeItem: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({ items: newItems });
    saveToStorage(newItems);
  },

  isInWishlist: (id) => !!get().items.find((i) => i.id === id),
}));
