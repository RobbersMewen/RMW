"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function ArabicPerfumePage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Arabic Perfume" title="Deep, opulent, unforgettable." description="Oud-led and amber-rich compositions with powerful identity and luxurious depth." tone="rose" />
      <CollectionCategoryDetail subcategory="Arabic Perfume" category="Perfume" />
    </PageShell>
  );
}
