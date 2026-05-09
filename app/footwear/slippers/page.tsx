import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Velvet Loafer", description: "Soft velvet with cushioned sole.", price: 75, images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Leather Slide", description: "Full-grain leather with arch support.", price: 90, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Suede Mule", description: "Premium suede with memory foam.", price: 85, images: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function SlippersPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Slippers" title="Luxury at every step." description="Handcrafted slippers blending comfort with refined aesthetics." tone="emerald" />
      <CollectionCategoryDetail title="Slippers Collection" description="Premium materials and ergonomic design for all-day ease." products={products} category="Slippers" />
    </PageShell>
  );
}
