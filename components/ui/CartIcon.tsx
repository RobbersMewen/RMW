"use client";

import Link from "next/link";
import { useCartStore, getCartCount } from "@/store/cart";
import { useEffect } from "react";

export function CartIcon() {
  const items = useCartStore((s) => s.items);
  const loadCart = useCartStore((s) => s.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const count = getCartCount(items);

  return (
    <Link href="/cart" className="cart-icon" aria-label="Shopping cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && <span className="cart-badge">{count}</span>}
    </Link>
  );
}
