"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { getAllProducts, ProductData } from "@/store/products";

type SortOption = "default" | "price-low" | "price-high" | "name";

export default function SearchPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  let filtered = products.filter((p) => {
    const matchesQuery = query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice =
      priceRange === "all" ? true :
      priceRange === "0-500" ? p.price <= 500 :
      priceRange === "500-1500" ? p.price > 500 && p.price <= 1500 :
      priceRange === "1500-3000" ? p.price > 1500 && p.price <= 3000 :
      p.price > 3000;
    return matchesQuery && matchesCategory && matchesPrice;
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
              placeholder="Search perfumes, leather goods..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="search-filter">
              <option value="all">All Categories</option>
              <option value="perfume">Perfume</option>
              <option value="leather">Leather</option>
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="search-filter">
              <option value="all">All Prices</option>
              <option value="0-500">Under Rs 500</option>
              <option value="500-1500">Rs 500 – 1,500</option>
              <option value="1500-3000">Rs 1,500 – 3,000</option>
              <option value="3000+">Above Rs 3,000</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="search-filter">
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
                    <span className="product-price">Rs {item.price.toLocaleString()}</span>
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
