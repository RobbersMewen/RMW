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

export function AddToCartWithQty({ id, name, price, image, category }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { loadCart(); }, [loadCart]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    for (let i = 0; i < qty; i++) {
      addItem({ id, name, price, image, category });
    }
    addToast(`${qty}× ${name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    setQty(1);
  };

  return (
    <div className="qty-cart-row">
      <div className="qty-selector">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(Math.max(1, qty - 1)); }}>−</button>
        <span>{qty}</span>
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(qty + 1); }}>+</button>
      </div>
      <button
        type="button"
        className={`add-to-cart-btn ${added ? "added" : ""}`}
        onClick={handleClick}
      >
        {added ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}
