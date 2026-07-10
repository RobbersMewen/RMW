"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/components/ui/Toast";
import { PageShell } from "@/components/PageShell";
import { useEffect } from "react";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const loadWishlist = useWishlistStore((s) => s.loadWishlist);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    loadWishlist();
    loadCart();
  }, [loadWishlist, loadCart]);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item);
    removeItem(item.id);
    addToast(`${item.name} moved to cart`);
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Wishlist</h1>

          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your wishlist is empty.</p>
              <Link href="/collection" className="primary-button">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {items.map((item) => (
                <article key={item.id} className="product-card glass-card">
                  <div className="product-img-wrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={380}
                      height={420}
                      className="product-img"
                    />
                  </div>
                  <div className="product-body">
                    <p className="product-tone">{item.category}</p>
                    <h3>{item.name}</h3>
                    <span className="product-price">Rs {item.price.toLocaleString()}</span>
                    <button
                      type="button"
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="cart-clear-btn"
                      onClick={() => {
                        removeItem(item.id);
                        addToast(`${item.name} removed`);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
