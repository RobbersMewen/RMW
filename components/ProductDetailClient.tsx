"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useToastStore } from "@/components/ui/Toast";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { useRecentlyViewed } from "@/store/recentlyViewed";
import { useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  stock?: number;
  is_active?: boolean;
};

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [activeImg, setActiveImg] = useState(0);
  const { items: wishlistItems, addItem: addWish, removeItem: removeWish, loadWishlist } = useWishlistStore();
  const loadCart = useCartStore((s) => s.loadCart);
  const addToast = useToastStore((s) => s.addToast);
  const { add: addRecent } = useRecentlyViewed();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadWishlist();
    loadCart();
    setMounted(true);
    addRecent({ id: product.id, name: product.name, price: product.price, image: product.images[0], category: product.category });
  }, [loadWishlist, loadCart, addRecent, product]);

  const isWished = mounted && wishlistItems.some((i) => i.id === product.id);
  const isLowStock = product.stock != null && product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock != null && product.stock === 0;

  const waMessage = encodeURIComponent(`Hi! I'd like to order:\n*${product.name}*\nPrice: Rs ${product.price.toLocaleString()}\n\nPlease confirm availability.`);
  const waLink = `https://wa.me/923123439173?text=${waMessage}`;

  return (
    <section className="section cart-section">
      <div className="container">
        <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
          <Link href="/">Home</Link> / <Link href={product.category === "perfume" ? "/collection" : "/leather"}>{product.category}</Link> / {product.name}
        </p>

        <div className="product-detail-layout">
          {/* Image Gallery */}
          <div className="product-detail-gallery">
            <div className="product-detail-main-img">
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="product-img"
                priority
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              {isLowStock && (
                <span className="stock-badge low">Only {product.stock} left!</span>
              )}
              {isOutOfStock && (
                <span className="stock-badge out">Out of Stock</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="product-detail-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-detail-thumb ${i === activeImg ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="product-img" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-detail-info">
            <p className="eyebrow">{product.subcategory}</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "0.5rem" }}>{product.name}</h1>
            <p className="product-detail-price">Rs {product.price.toLocaleString()}</p>

            <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{product.description}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {!isOutOfStock ? (
                <AddToCartButton id={product.id} name={product.name} price={product.price} image={product.images[0]} category={product.category} />
              ) : (
                <button className="add-to-cart-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Out of Stock</button>
              )}

              <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-order-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </a>

              <button
                className={`wishlist-outline-btn ${isWished ? "wished" : ""}`}
                onClick={() => {
                  if (isWished) { removeWish(product.id); addToast(`${product.name} removed from wishlist`); }
                  else { addWish({ id: product.id, name: product.name, price: product.price, image: product.images[0], category: product.category }); addToast(`${product.name} added to wishlist`); }
                }}
              >
                {isWished ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
              </button>
            </div>

            <div className="product-detail-meta">
              <div><span>Category</span><span>{product.category}</span></div>
              <div><span>Type</span><span>{product.subcategory}</span></div>
              {product.stock != null && !isOutOfStock && (
                <div><span>Availability</span><span style={{ color: isLowStock ? "#ef5350" : "#4caf50" }}>{isLowStock ? `Only ${product.stock} left` : "In Stock"}</span></div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="related-section">
            <div className="section-head">
              <p className="eyebrow">You may also like</p>
              <h2>Related Products</h2>
            </div>
            <div className="featured-grid">
              {related.map((item) => (
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
                  <div className="featured-cart-wrap">
                    <AddToCartButton id={item.id} name={item.name} price={item.price} image={item.images[0]} category={item.category} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
