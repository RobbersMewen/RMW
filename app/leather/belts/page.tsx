"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function BeltsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Belts" title="The finishing touch." description="Premium leather belts that elevate any outfit with subtle authority." tone="gold" />
      <CollectionCategoryDetail subcategory="Belts" category="Leather" />
    </PageShell>
  );
}
