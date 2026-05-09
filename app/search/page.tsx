"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { allProducts } from "@/store/products";

type SortOption = "default" | "price-low" | "price-high" | "name";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  let filtered = allProducts.filter((p) => {
    const matchesQuery = query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Search Products</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search perfumes, clothes, footwear..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-filter"
            >
              <option value="all">All Categories</option>
              <option value="Perfume">Perfume</option>
              <option value="Clothes">Clothes</option>
              <option value="Footwear">Footwear</option>
              <option value="Leather">Leather</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="search-filter"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>

          <p className="search-count">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 ? (
            <div className="cart-empty glass-card">
              <div className="empty-icon">🔍</div>
              <h2>No results found</h2>
              <p>Try a different search term or browse our categories.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((item) => (
                <article key={item.id} className="product-card glass-card">
                  <div className="product-img-wrap">
                    <ImageCarousel images={item.images} alt={item.name} />
                    <WishlistButton
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.images[0]}
                      category={item.category}
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
                      category={item.category}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
