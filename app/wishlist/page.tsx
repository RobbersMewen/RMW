"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/components/ui/Toast";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { getAllProducts, ProductData } from "@/store/products";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const loadWishlist = useWishlistStore((s) => s.loadWishlist);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);
  const [featured, setFeatured] = useState<ProductData[]>([]);

  useEffect(() => {
    loadWishlist();
    loadCart();
    getAllProducts().then((p) => setFeatured(p.slice(0, 4)));
  }, [loadWishlist, loadCart]);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item);
    removeItem(item.id);
    addToast(`${item.name} moved to cart`);
  };

  const handleAddAll = () => {
    items.forEach((item) => addToCart(item));
    items.forEach((item) => removeItem(item.id));
    addToast(`${items.length} items moved to cart`);
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h1 className="cart-title" style={{ marginBottom: 0 }}>Wishlist ({items.length})</h1>
            {items.length > 1 && (
              <button className="primary-button" onClick={handleAddAll}>Add All to Cart</button>
            )}
          </div>

          {items.length === 0 ? (
            <>
              <div className="cart-empty">
                <div className="empty-icon">♡</div>
                <h2>Your wishlist is empty</h2>
                <p>Save items you love and come back to them anytime.</p>
                <Link href="/collection" className="primary-button">Explore Products</Link>
              </div>
              {featured.length > 0 && (
                <div className="related-section">
                  <div className="section-head">
                    <p className="eyebrow">Start exploring</p>
                    <h2>You might love these.</h2>
                  </div>
                  <div className="featured-grid">
                    {featured.map((item) => (
                      <Link key={item.id} href={`/product/${item.id}`} className="featured-card glass-card">
                        <div className="featured-img-wrap" style={{ position: "relative" }}>
                          <Image src={item.images[0]} alt={item.name} fill className="product-img" sizes="25vw" />
                        </div>
                        <div className="featured-body">
                          <div>
                            <p className="product-tone">{item.subcategory}</p>
                            <h3>{item.name}</h3>
                          </div>
                          <span className="product-price">Rs {item.price.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="product-grid">
              {items.map((item) => (
                <article key={item.id} className="product-card glass-card">
                  <Link href={`/product/${item.id}`} style={{ display: "contents" }}>
                    <div className="product-img-wrap">
                      <Image src={item.image} alt={item.name} fill className="product-img" sizes="33vw" />
                    </div>
                    <div className="product-body">
                      <p className="product-tone">{item.category}</p>
                      <h3>{item.name}</h3>
                      <span className="product-price">Rs {item.price.toLocaleString()}</span>
                    </div>
                  </Link>
                  <div style={{ padding: "0 1.2rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <button type="button" className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                      Move to Cart
                    </button>
                    <button type="button" className="cart-clear-btn" onClick={() => { removeItem(item.id); addToast(`${item.name} removed`); }}>
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
