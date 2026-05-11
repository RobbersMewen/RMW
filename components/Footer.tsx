import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">ROBBERS MEWEN</Link>
            <p className="footer-tagline">Luxury lifestyle brand crafting modern identities with bold elegance.</p>
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
            <Link href="/cart">Cart</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/search">Search</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Robbers Mewen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
