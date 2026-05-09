"use client";

import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";

const products = [
  {
    name: "Crown of Amber",
    profile: "Warm amber, rosewood, and smoked vanilla",
    tone: "Evening",
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    name: "Silk in Rain",
    profile: "White musk, iris petals, and cool citrus mist",
    tone: "Daylight",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    name: "Black Opaline",
    profile: "Incense, leather accord, and dark plum",
    tone: "Statement",
    price: 215,
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75"
    ]
  }
];

export function CollectionGrid() {
  return (
    <section id="collection" className="section section-spacing">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Featured Collection</p>
          <h2>Luxury in restrained motion.</h2>
        </div>

        <div className="product-grid">
          {products.map((item) => (
            <article className="product-card glass-card" key={item.name}>
              <div className="product-img-wrap">
                <ImageCarousel images={item.images} alt={item.name} />
                <WishlistButton
                  id={`perfume-${item.name}`}
                  name={item.name}
                  price={item.price}
                  image={item.images[0]}
                  category="Perfume"
                />
              </div>
              <div className="product-body">
                <p className="product-tone">{item.tone}</p>
                <h3>{item.name}</h3>
                <p>{item.profile}</p>
                <span className="product-price">${item.price}</span>
                <AddToCartButton
                  id={`perfume-${item.name}`}
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
