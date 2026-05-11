import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image src="/logo.jpg" alt="Robbers Mewen" width={36} height={36} className="footer-logo" />
            </Link>
            <p className="footer-tagline">Premium perfumes & handcrafted leather goods with bold elegance.</p>
          </div>

          <div className="footer-col">
            <h4>Perfume</h4>
            <Link href="/collection/french-perfume">French Perfume</Link>
            <Link href="/collection/arabic-perfume">Arabic Perfume</Link>
            <Link href="/collection/ittar">Ittar</Link>
            <Link href="/collection/body-spray">Body Spray</Link>
          </div>

          <div className="footer-col">
            <h4>Leather</h4>
            <Link href="/leather/wallets">Wallets</Link>
            <Link href="/leather/belts">Belts</Link>
            <Link href="/leather/bands">Bands</Link>
            <Link href="/leather/keychains">Keychains</Link>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <Link href="/track-order">Track Order</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/search">Search</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Robbers Mewen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
