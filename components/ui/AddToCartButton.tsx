"use client";

import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export function AddToCartButton({ id, name, price, image, category }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, category });
    addToast(`${name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      className={`add-to-cart-btn ${added ? "added" : ""}`}
      onClick={handleClick}
    >
      {added ? "✓ Added" : "Add to Cart"}
    </button>
  );
}
