import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Musk Attar", description: "Pure white musk oil with intimate warmth.", price: 95, images: ["https://images.unsplash.com/photo-1595425964272-fc617fa25e92?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1595425964272-fc617fa25e92?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1595425964272-fc617fa25e92?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Oud Amber Attar", description: "Concentrated oud and amber blend.", price: 135, images: ["https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Rose Saffron Attar", description: "Damask rose and saffron in oil base.", price: 120, images: ["https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function IttarPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Ittar" title="Pure oils, timeless craft." description="Alcohol-free perfume oils crafted for intimacy, ritual, and smooth longevity." tone="emerald" />
      <CollectionCategoryDetail title="Ittar Selection" description="Concentrated oils with rich nuance and skin-close sophistication." products={products} category="Ittar" />
    </PageShell>
  );
}
