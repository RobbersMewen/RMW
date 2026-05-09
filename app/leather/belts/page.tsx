import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Classic Formal", description: "Polished buckle with smooth leather.", price: 65, images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Reversible Duo", description: "Black and brown in one belt.", price: 80, images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Casual Woven", description: "Braided leather with antique buckle.", price: 55, images: ["https://images.unsplash.com/photo-1585856331426-d7b22f2ae2f0?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1585856331426-d7b22f2ae2f0?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1585856331426-d7b22f2ae2f0?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function BeltsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Belts" title="The finishing touch." description="Premium leather belts that elevate any outfit with subtle authority." tone="gold" />
      <CollectionCategoryDetail title="Belts Collection" description="Crafted from full-grain leather with signature buckle designs." products={products} category="Belts" />
    </PageShell>
  );
}
