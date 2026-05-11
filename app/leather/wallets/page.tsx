"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function WalletsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Wallets" title="Carry with class." description="Slim, durable, and beautifully finished leather wallets for daily use." tone="rose" />
      <CollectionCategoryDetail subcategory="Wallets" category="Leather" />
    </PageShell>
  );
}
