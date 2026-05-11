"use client";

import { useEffect, useState } from "react";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartWithQty } from "@/components/ui/AddToCartWithQty";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { getProductsBySubcategory, ProductData } from "@/store/products";

type Props = {
  subcategory: string;
  category: string;
};

export function CollectionCategoryDetail({ subcategory, category }: Props) {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    getProductsBySubcategory(subcategory).then(setProducts);
  }, [subcategory]);

  return (
    <section className="section">
      <div className="container">
        <div className="product-grid">
          {products.map((item) => (
            <article key={item.id} className="product-card glass-card">
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
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="product-price">${item.price}</span>
                <AddToCartWithQty
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
      </div>
    </section>
  );
}
