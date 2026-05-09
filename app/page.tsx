"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { AddToCartButton } from "@/components/ui/AddToCartButton";

const featured = [
  { id: "perfume-crown-of-amber", name: "Crown of Amber", price: 189, category: "Perfume", href: "/collection/arabic-perfume", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=480&fit=crop&q=75" },
  { id: "clothes-classic-kurta", name: "Classic Kurta", price: 85, category: "Clothes", href: "/clothes/stitched", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=480&fit=crop&q=75" },
  { id: "perfume-velvet-saffron", name: "Velvet Saffron Oud", price: 275, category: "Perfume", href: "/collection/arabic-perfume", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=480&fit=crop&q=75" },
  { id: "clothes-lawn-premium", name: "Lawn Premium", price: 65, category: "Clothes", href: "/clothes/unstitched", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=480&fit=crop&q=75" },
];

export default function Home() {
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
            A modern lifestyle brand with bold elegance — perfumes, clothes, footwear,
            and leather goods crafted for those who demand more.
          </p>
          <div className="hero-actions">
            <Link href="/collection" className="primary-button">
              Shop Perfumes
            </Link>
            <Link href="/clothes" className="secondary-button">
              Shop Clothes
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
                <Link href={item.href}>
                  <div className="featured-img-wrap">
                    <Image
                      src={item.image}
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
                    image={item.image}
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
