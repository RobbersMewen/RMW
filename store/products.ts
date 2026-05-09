export type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
};

export const allProducts: ProductData[] = [
  // Perfumes
  {
    id: "perfume-Crown of Amber", name: "Crown of Amber", description: "Warm amber, rosewood, and smoked vanilla", price: 189, category: "Perfume", subcategory: "Arabic Perfume",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "perfume-Silk in Rain", name: "Silk in Rain", description: "White musk, iris petals, and cool citrus mist", price: 145, category: "Perfume", subcategory: "French Perfume",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "perfume-Black Opaline", name: "Black Opaline", description: "Incense, leather accord, and dark plum", price: 215, category: "Perfume", subcategory: "Arabic Perfume",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "perfume-Velvet Fleur", name: "Velvet Fleur", description: "Peony, white tea, and powdery musk", price: 165, category: "Perfume", subcategory: "French Perfume",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "perfume-Royal Oud Veil", name: "Royal Oud Veil", description: "Aged oud, rose absolute, and smoky amber", price: 285, category: "Perfume", subcategory: "Arabic Perfume",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "perfume-Musk Attar", name: "Musk Attar", description: "Pure white musk oil with intimate warmth", price: 95, category: "Perfume", subcategory: "Ittar",
    images: [
      "https://images.unsplash.com/photo-1595425964272-fc617fa25e92?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=380&h=420&fit=crop&q=75"
    ]
  },
  // Clothes
  {
    id: "Stitched-Classic Kurta", name: "Classic Kurta", description: "Premium cotton with minimal embroidery", price: 85, category: "Clothes", subcategory: "Stitched",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "Unstitched-Lawn Collection", name: "Lawn Collection", description: "Lightweight printed lawn for summer", price: 45, category: "Clothes", subcategory: "Unstitched",
    images: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "Stitched-Formal Shalwar Suit", name: "Formal Shalwar Suit", description: "Tailored fit with silk-blend fabric", price: 120, category: "Clothes", subcategory: "Stitched",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=380&h=420&fit=crop&q=75"
    ]
  },
  // Footwear
  {
    id: "Sneakers-Classic White", name: "Classic White Sneaker", description: "Clean minimal design in premium leather", price: 130, category: "Footwear", subcategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "Sneakers-Urban Runner", name: "Urban Runner", description: "Lightweight mesh with responsive cushion", price: 145, category: "Footwear", subcategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=380&h=420&fit=crop&q=75"
    ]
  },
  // Leather
  {
    id: "Wallets-Bifold Classic", name: "Bifold Classic Wallet", description: "Full-grain leather with 8 card slots", price: 75, category: "Leather", subcategory: "Wallets",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=380&h=420&fit=crop&q=75"
    ]
  },
  {
    id: "Belts-Classic Formal", name: "Classic Formal Belt", description: "Polished buckle with smooth leather", price: 65, category: "Leather", subcategory: "Belts",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=380&h=420&fit=crop&q=75",
      "https://images.unsplash.com/photo-1585856331426-d7b22f2ae2f0?w=380&h=420&fit=crop&q=75"
    ]
  },
];
