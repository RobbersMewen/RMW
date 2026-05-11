import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function ArabicPerfumePage() {
  const products = await getProductsBySubcategory("Arabic Perfume");

  return (
    <PageShell>
      <PageIntro eyebrow="Arabic Perfume" title="Deep, opulent, unforgettable." description="Oud-led and amber-rich compositions with powerful identity and luxurious depth." tone="rose" />
      <CollectionCategoryDetail products={products} category="Perfume" />
    </PageShell>
  );
}
