import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Classic White", description: "Clean minimal design in premium leather.", price: 130, images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Urban Runner", description: "Lightweight mesh with responsive cushion.", price: 145, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "High-Top Noir", description: "Black leather high-top with gold accents.", price: 175, images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function SneakersPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Sneakers" title="Street-ready, always." description="Modern sneakers with bold design and premium build quality." tone="violet" />
      <CollectionCategoryDetail title="Sneakers Collection" description="Engineered for style and built for movement." products={products} category="Sneakers" />
    </PageShell>
  );
}
