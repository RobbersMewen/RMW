import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </main>
  );
}
