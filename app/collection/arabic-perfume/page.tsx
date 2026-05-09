import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Royal Oud Veil", description: "Aged oud, rose absolute, and smoky amber.", price: 285, images: ["https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Amber Majlis", description: "Warm amber, frankincense, and golden saffron.", price: 245, images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Saffron Dusk", description: "Saffron threads, oud wood, and creamy sandalwood.", price: 265, images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function ArabicPerfumePage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Arabic Perfume" title="Deep, opulent, unforgettable." description="Oud-led and amber-rich compositions with powerful identity and luxurious depth." tone="rose" />
      <CollectionCategoryDetail title="Arabic Perfume Selection" description="Bold accords designed for long wear and a premium evening aura." products={products} category="Arabic Perfume" />
    </PageShell>
  );
}
