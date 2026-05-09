"use client";

import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartWithQty } from "@/components/ui/AddToCartWithQty";
import { WishlistButton } from "@/components/ui/WishlistButton";

export type Product = {
  name: string;
  description: string;
  price: number;
  images: string[];
};

type Props = {
  title: string;
  description: string;
  products: Product[];
  category: string;
};

export function CollectionCategoryDetail({ products, category }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="product-grid">
          {products.map((item) => (
            <article key={item.name} className="product-card glass-card">
              <div className="product-img-wrap">
                <ImageCarousel images={item.images} alt={item.name} />
                <WishlistButton
                  id={`${category}-${item.name}`}
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
                  id={`${category}-${item.name}`}
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
