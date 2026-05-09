import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Loop Keychain", description: "Simple loop with brass hardware.", price: 20, images: ["https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Tag Keychain", description: "Engraved leather tag with ring.", price: 25, images: ["https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Braided Clip", description: "Woven leather with carabiner clip.", price: 28, images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function KeychainsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Keychains" title="Small detail, big impression." description="Handcrafted leather keychains that add character to your everyday carry." tone="violet" />
      <CollectionCategoryDetail title="Keychains Collection" description="Compact leather accessories with premium hardware." products={products} category="Keychains" />
    </PageShell>
  );
}
