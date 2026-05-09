import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Classic Watch Strap", description: "Padded leather with quick-release.", price: 40, images: ["https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Braided Wrist Wrap", description: "Hand-braided with magnetic clasp.", price: 30, images: ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Minimalist Band", description: "Thin profile with brushed hardware.", price: 35, images: ["https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function BandsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Bands" title="Wrist-worthy leather." description="Watch bands and wrist wraps crafted for comfort and character." tone="emerald" />
      <CollectionCategoryDetail title="Bands Collection" description="Supple leather straps designed for everyday elegance." products={products} category="Bands" />
    </PageShell>
  );
}
