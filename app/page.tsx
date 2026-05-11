"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { getAllProducts, ProductData } from "@/store/products";

export default function Home() {
  const [featured, setFeatured] = useState<ProductData[]>([]);

  useEffect(() => {
    getAllProducts().then((products) => {
      const picks = [
        products.find((p) => p.id === "perfume-crown-of-amber"),
        products.find((p) => p.id === "leather-bifold-classic"),
        products.find((p) => p.id === "perfume-noir-petale"),
        products.find((p) => p.id === "leather-classic-formal"),
      ].filter(Boolean) as ProductData[];
      setFeatured(picks);
    });
  }, []);

  return (
    <PageShell>
      <section className="brand-home section">
        <div className="container brand-home-shell">
          <p className="eyebrow">Luxury Lifestyle Brand</p>
          <h1 className="brand-wordmark">
            ROBBERS
            <span>MEWEN</span>
          </h1>
          <p className="brand-home-copy">
            A modern lifestyle brand with bold elegance — perfumes and leather goods crafted for those who demand more.
          </p>
          <div className="hero-actions">
            <Link href="/collection" className="primary-button">
              Shop Perfumes
            </Link>
            <Link href="/leather" className="secondary-button">
              Shop Leather
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-spacing">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Bestsellers</p>
            <h2>Most loved by our customers.</h2>
          </div>
          <div className="featured-grid">
            {featured.map((item) => (
              <div key={item.id} className="featured-card glass-card">
                <Link href={item.category === "Perfume" ? "/collection" : "/leather"}>
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
                    <span className="product-price">${item.price}</span>
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
        </div>
      </section>
    </PageShell>
  );
}
