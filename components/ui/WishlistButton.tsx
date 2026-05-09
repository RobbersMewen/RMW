"use client";

import { useWishlistStore } from "@/store/wishlist";
import { useToastStore } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export function WishlistButton({ id, name, price, image, category }: Props) {
  const { items, addItem, removeItem, loadWishlist } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadWishlist();
    setMounted(true);
  }, [loadWishlist]);

  const isWished = mounted && items.some((i) => i.id === id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWished) {
      removeItem(id);
      addToast(`${name} removed from wishlist`);
    } else {
      addItem({ id, name, price, image, category });
      addToast(`${name} added to wishlist`);
    }
  };

  return (
    <button
      type="button"
      className={`wishlist-btn ${isWished ? "wished" : ""}`}
      onClick={handleClick}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWished ? "♥" : "♡"}
    </button>
  );
}
