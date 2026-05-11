import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function BandsPage() {
  const products = await getProductsBySubcategory("Bands");

  return (
    <PageShell>
      <PageIntro eyebrow="Bands" title="Wrist-worthy leather." description="Watch bands and wrist wraps crafted for comfort and character." tone="emerald" />
      <CollectionCategoryDetail products={products} category="Leather" />
    </PageShell>
  );
}
