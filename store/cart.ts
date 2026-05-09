import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  loadCart: () => void;
};

function saveToStorage(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("rm-cart", JSON.stringify(items));
  }
}

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("rm-cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  loadCart: () => {
    set({ items: loadFromStorage() });
  },

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    let newItems: CartItem[];
    if (existing) {
      newItems = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...get().items, { ...item, quantity: 1 }];
    }
    set({ items: newItems });
    saveToStorage(newItems);
  },

  removeItem: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({ items: newItems });
    saveToStorage(newItems);
  },

  updateQuantity: (id, quantity) => {
    let newItems: CartItem[];
    if (quantity <= 0) {
      newItems = get().items.filter((i) => i.id !== id);
    } else {
      newItems = get().items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
    }
    set({ items: newItems });
    saveToStorage(newItems);
  },

  clearCart: () => {
    set({ items: [] });
    saveToStorage([]);
  },
}));

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);
