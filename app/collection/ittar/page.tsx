"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function IttarPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Ittar" title="Pure oils, timeless craft." description="Alcohol-free perfume oils crafted for intimacy, ritual, and smooth longevity." tone="emerald" />
      <CollectionCategoryDetail subcategory="Ittar" category="Perfume" />
    </PageShell>
  );
}
