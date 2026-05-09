import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Classic Kurta", description: "Premium cotton with minimal embroidery.", price: 85, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Formal Shalwar Suit", description: "Tailored fit with silk-blend fabric.", price: 120, images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Casual Co-ord Set", description: "Relaxed silhouette in breathable linen.", price: 95, images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function StitchedPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Stitched" title="Ready to wear, built to impress." description="Tailored fits with premium fabric and modern cuts for every occasion." tone="violet" />
      <CollectionCategoryDetail title="Stitched Collection" description="Precision-cut garments designed for comfort and confidence." products={products} category="Stitched" />
    </PageShell>
  );
}
