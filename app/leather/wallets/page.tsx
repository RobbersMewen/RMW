import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

const products = [
  { name: "Bifold Classic", description: "Full-grain leather with 8 card slots.", price: 75, images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Slim Cardholder", description: "Minimalist design, holds 6 cards.", price: 45, images: ["https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=380&h=420&fit=crop&crop=right&q=75"] },
  { name: "Long Wallet", description: "Spacious with zip compartment.", price: 95, images: ["https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=380&h=420&fit=crop&q=75", "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=380&h=420&fit=crop&crop=left&q=75", "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=380&h=420&fit=crop&crop=right&q=75"] }
];

export default function WalletsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Wallets" title="Carry with class." description="Slim, durable, and beautifully finished leather wallets for daily use." tone="rose" />
      <CollectionCategoryDetail title="Wallets Collection" description="Full-grain leather with hand-stitched detailing." products={products} category="Wallets" />
    </PageShell>
  );
}
