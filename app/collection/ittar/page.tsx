import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function IttarPage() {
  const products = await getProductsBySubcategory("Ittar");

  return (
    <PageShell>
      <PageIntro eyebrow="Ittar" title="Pure oils, timeless craft." description="Alcohol-free perfume oils crafted for intimacy, ritual, and smooth longevity." tone="emerald" />
      <CollectionCategoryDetail products={products} category="Perfume" />
    </PageShell>
  );
}
