"use client";

import Link from "next/link";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { ProductData } from "@/store/products";

export function ProductGrid({ products, category }: { products: ProductData[]; category: string }) {
  return (
    <div className="product-grid">
      {products.map((item) => {
        const isLowStock = (item as any).stock != null && (item as any).stock > 0 && (item as any).stock <= 5;
        const isOutOfStock = (item as any).stock === 0;
        return (
          <article className="product-card glass-card" key={item.id}>
            <Link href={`/product/${item.id}`} style={{ display: "contents" }}>
              <div className="product-img-wrap">
                <ImageCarousel images={item.images} alt={item.name} />
                <WishlistButton id={item.id} name={item.name} price={item.price} image={item.images[0]} category={category} />
                {isLowStock && <span className="stock-badge low">Only {(item as any).stock} left!</span>}
                {isOutOfStock && <span className="stock-badge out">Out of Stock</span>}
              </div>
              <div className="product-body">
                <p className="product-tone">{item.subcategory}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="product-price" suppressHydrationWarning>Rs {item.price.toLocaleString()}</span>
              </div>
            </Link>
            <div style={{ padding: "0 1.2rem 1.2rem" }}>
              <AddToCartButton id={item.id} name={item.name} price={item.price} image={item.images[0]} category={category} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
