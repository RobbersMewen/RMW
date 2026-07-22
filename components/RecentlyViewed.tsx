"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/store/recentlyViewed";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { items, load } = useRecentlyViewed();
  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((i) => i.id !== excludeId).slice(0, 4);
  if (filtered.length === 0) return null;

  return (
    <div className="related-section">
      <div className="section-head">
        <p className="eyebrow">Recently Viewed</p>
        <h2>Pick up where you left off.</h2>
      </div>
      <div className="featured-grid">
        {filtered.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} className="featured-card glass-card">
            <div className="featured-img-wrap" style={{ position: "relative" }}>
              <Image src={item.image} alt={item.name} fill className="product-img" sizes="25vw" />
            </div>
            <div className="featured-body">
              <div>
                <p className="product-tone">{item.category}</p>
                <h3>{item.name}</h3>
              </div>
              <span className="product-price">Rs {item.price.toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
