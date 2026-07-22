"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { ProductData } from "@/store/products";

export function HomeFeatured({ products }: { products: ProductData[] }) {
  return (
    <div className="featured-grid">
      {products.map((item) => (
        <div key={item.id} className="featured-card glass-card">
          <Link href={`/product/${item.id}`}>
            <div className="featured-img-wrap">
              <Image
                src={item.images[0]}
                alt={item.name}
                width={400}
                height={480}
                className="product-img"
                priority
                sizes="(max-width: 920px) 50vw, 25vw"
              />
            </div>
            <div className="featured-body">
              <div>
                <p className="product-tone">{item.category}</p>
                <h3>{item.name}</h3>
              </div>
              <span className="product-price" suppressHydrationWarning>Rs {item.price.toLocaleString()}</span>
            </div>
          </Link>
          <div className="featured-cart-wrap">
            <AddToCartButton
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.images[0]}
              category={item.category}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
