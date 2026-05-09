import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Lawn Collection", description: "Lightweight printed lawn for summer.", price: 45, images: ["https://images.unsplash.com/photo-1558171813-4c088753af8f?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Linen Premium", description: "Textured linen in earthy tones.", price: 65, images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Wool Blend Winter", description: "Heavy wool blend for cold weather.", price: 95, images: ["https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function UnstitchedPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Unstitched" title="Your fabric, your vision." description="Premium unstitched fabrics for bespoke tailoring and personal expression." tone="gold" />
      <CollectionCategoryDetail title="Unstitched Collection" description="Luxurious fabrics sourced for texture, drape, and lasting quality." products={products} category="Unstitched" />
    </PageShell>
  );
}
