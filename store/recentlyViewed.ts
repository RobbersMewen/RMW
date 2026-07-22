import { create } from "zustand";

export type RecentItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type RecentlyViewedStore = {
  items: RecentItem[];
  load: () => void;
  add: (item: RecentItem) => void;
};

function save(items: RecentItem[]) {
  if (typeof window !== "undefined") localStorage.setItem("rm-recent", JSON.stringify(items));
}

function load(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("rm-recent") || "[]"); } catch { return []; }
}

export const useRecentlyViewed = create<RecentlyViewedStore>((set, get) => ({
  items: [],
  load: () => set({ items: load() }),
  add: (item) => {
    const filtered = get().items.filter((i) => i.id !== item.id);
    const newItems = [item, ...filtered].slice(0, 6);
    set({ items: newItems });
    save(newItems);
  },
}));
