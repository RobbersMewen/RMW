import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function WalletsPage() {
  const products = await getProductsBySubcategory("Wallets");

  return (
    <PageShell>
      <PageIntro eyebrow="Wallets" title="Carry with class." description="Slim, durable, and beautifully finished leather wallets for daily use." tone="rose" />
      <CollectionCategoryDetail products={products} category="Leather" />
    </PageShell>
  );
}
