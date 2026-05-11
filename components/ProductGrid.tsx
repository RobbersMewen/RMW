"use client";

import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { ProductData } from "@/store/products";

export function ProductGrid({ products, category }: { products: ProductData[]; category: string }) {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <article className="product-card glass-card" key={item.id}>
          <div className="product-img-wrap">
            <ImageCarousel images={item.images} alt={item.name} />
            <WishlistButton
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.images[0]}
              category={category}
            />
          </div>
          <div className="product-body">
            <p className="product-tone">{item.subcategory}</p>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="product-price">${item.price}</span>
            <AddToCartButton
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.images[0]}
              category={category}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
