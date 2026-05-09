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
            <h4>Shop</h4>
            <Link href="/collection">Perfume</Link>
            <Link href="/clothes">Clothes</Link>
            <Link href="/footwear">Footwear</Link>
            <Link href="/leather">Leather</Link>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <Link href="/collection/french-perfume">French Perfume</Link>
            <Link href="/collection/arabic-perfume">Arabic Perfume</Link>
            <Link href="/clothes/stitched">Stitched</Link>
            <Link href="/clothes/unstitched">Unstitched</Link>
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
