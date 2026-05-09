import { CollectionGrid } from "@/components/CollectionGrid";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function CollectionPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Curated Collection"
        title="The Robbers Mewen Library"
        description="A refined line of modern compositions with glossy depth, clean projection, and long-wear elegance."
        tone="gold"
      />
      <CollectionGrid />
    </PageShell>
  );
}
