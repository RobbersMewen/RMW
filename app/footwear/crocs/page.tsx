import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Classic Clog", description: "Iconic comfort with ventilation ports.", price: 45, images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Sport Slide", description: "Contoured footbed for active recovery.", price: 35, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Platform Lite", description: "Elevated sole with lightweight build.", price: 55, images: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function CrocsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Crocs" title="Casual done right." description="Lightweight, durable, and effortlessly comfortable for everyday wear." tone="gold" />
      <CollectionCategoryDetail title="Crocs Collection" description="Easy-wear designs for home, beach, and beyond." products={products} category="Crocs" />
    </PageShell>
  );
}
