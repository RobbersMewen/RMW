"use client";

import { useEffect, useState } from "react";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { getProductsByCategory, ProductData } from "@/store/products";

export function CollectionGrid() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    getProductsByCategory("Perfume").then(setProducts);
  }, []);

  return (
    <section id="collection" className="section section-spacing">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Featured Collection</p>
          <h2>Luxury in restrained motion.</h2>
        </div>

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
                  category="Perfume"
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
                  category="Perfume"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
