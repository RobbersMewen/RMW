import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Velvet Fleur", description: "Peony, white tea, and powdery musk.", price: 165, images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Citrus Blanche", description: "Bergamot, neroli, and sheer cedar.", price: 140, images: ["https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Noir Petale", description: "Dark rose, violet leaf, and smoky iris.", price: 195, images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function FrenchPerfumePage() {
  return (
    <PageShell>
      <PageIntro eyebrow="French Perfume" title="Parisian elegance in every note." description="Floral, powdery, and citrus-forward creations inspired by modern French perfumery." tone="gold" />
      <CollectionCategoryDetail title="French Perfume Selection" description="Refined structures with polished projection and a clean, sophisticated finish." products={products} category="French Perfume" />
    </PageShell>
  );
}
