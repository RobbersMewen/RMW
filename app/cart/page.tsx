"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, getCartTotal, getCartCount } from "@/store/cart";
import { useToastStore } from "@/components/ui/Toast";
import { PageShell } from "@/components/PageShell";
import { getAllProducts, ProductData } from "@/store/products";
import { useEffect, useState } from "react";

import { RecentlyViewed } from "@/components/RecentlyViewed";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const addItem = useCartStore((s) => s.addItem);
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);
  const [related, setRelated] = useState<ProductData[]>([]);

  useEffect(() => { loadCart(); }, [loadCart]);

  useEffect(() => {
    const cartIds = new Set(items.map((i) => i.id));
    getAllProducts().then((products) => {
      setRelated(products.filter((p) => !cartIds.has(p.id)).slice(0, 4));
    });
  }, [items]);

  const subtotal = getCartTotal(items);
  const itemCount = getCartCount(items);
  const shipping = subtotal >= 10000 ? 0 : 200;
  const total = items.length > 0 ? subtotal + shipping : 0;

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Your Cart</h1>

          {items.length === 0 ? (
            <div className="cart-empty glass-card">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything yet. Explore our collections and find something you love.</p>
              <Link href="/collection" className="primary-button">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item glass-card">
                    <div className="cart-item-img">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="product-img"
                      />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <div>
                          <p className="cart-item-category">{item.category}</p>
                          <h3>{item.name}</h3>
                          <p className="cart-item-unit">Rs {item.price.toLocaleString()} each</p>
                        </div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => { removeItem(item.id); addToast(`${item.name} removed`); }}
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="cart-qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <span className="product-price">Rs {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="cart-clear-btn" onClick={() => { clearCart(); addToast("Cart cleared"); }}>
                  Clear Cart
                </button>
              </div>

              <div className="cart-summary glass-card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Items ({itemCount})</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="shipping-note">Free shipping on orders over Rs 10,000</p>
                )}
                <div className="summary-divider" />
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>Rs {total.toLocaleString()}</span>
                </div>
                <Link href="/checkout" className="primary-button checkout-btn">
                  Proceed to Checkout
                </Link>
                <Link href="/collection" className="text-button continue-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="related-section">
              <div className="section-head">
                <p className="eyebrow">You may also like</p>
                <h2>Complete your look.</h2>
              </div>
              <div className="featured-grid">
                {related.map((item) => (
                  <div key={item.id} className="featured-card glass-card">
                    <div className="featured-img-wrap">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={380}
                        height={420}
                        className="product-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="featured-body">
                      <div>
                        <p className="product-tone">{item.category}</p>
                        <h3>{item.name}</h3>
                      </div>
                      <span className="product-price">Rs {item.price.toLocaleString()}</span>
                    </div>
                    <div className="featured-cart-wrap">
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => { addItem({ ...item, image: item.images[0] }); addToast(`${item.name} added to cart`); }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <RecentlyViewed />
        </div>
      </section>
    </PageShell>
  );
}
