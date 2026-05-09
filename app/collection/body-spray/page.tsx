import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Cedar Mist", description: "Light cedarwood, green tea, and fresh air.", price: 65, images: ["https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Aqua Musk", description: "Marine notes, white musk, and cool cucumber.", price: 55, images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Velvet Citrus", description: "Mandarin, grapefruit, and soft vetiver.", price: 60, images: ["https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1619994403073-2cec844b8c63?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function BodySprayPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Body Spray" title="Fresh luxury for every day." description="Lightweight modern sprays with clean profiles, ideal for daily refresh and layering." tone="violet" />
      <CollectionCategoryDetail title="Body Spray Selection" description="Balanced, wearable scent structures for office, travel, and casual wear." products={products} category="Body Spray" />
    </PageShell>
  );
}
