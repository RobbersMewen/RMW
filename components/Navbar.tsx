"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartIcon } from "@/components/ui/CartIcon";

const navDropdowns = [
  {
    label: "Perfume",
    href: "/collection",
    items: [
      { label: "French Perfume", href: "/collection/french-perfume", note: "Elegant floral and citrus signatures" },
      { label: "Arabic Perfume", href: "/collection/arabic-perfume", note: "Rich oud, amber, and resin blends" },
      { label: "Ittar", href: "/collection/ittar", note: "Alcohol-free concentrated perfume oils" },
      { label: "Body Spray", href: "/collection/body-spray", note: "Fresh daily scents with smooth projection" }
    ]
  },
  {
    label: "Leather",
    href: "/leather",
    items: [
      { label: "Wallets", href: "/leather/wallets", note: "Handcrafted premium leather" },
      { label: "Belts", href: "/leather/belts", note: "Statement accessories" },
      { label: "Bands", href: "/leather/bands", note: "Watch bands & wrist wraps" },
      { label: "Keychains", href: "/leather/keychains", note: "Refined everyday carry" }
    ]
  }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="nav-shell">
      <nav className="container nav">
        <Link href="/" className="logo" aria-label="Robbers Mewen home">
          <Image src="/logo.jpg" alt="Robbers Mewen" width={40} height={40} className="nav-logo" priority />
          <span className="logo-text">ROBBERS MEWEN</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {navDropdowns.map((dropdown) => (
            <li key={dropdown.href} className="nav-dropdown-wrap">
              <span className="nav-dropdown-trigger">
                {dropdown.label} <span className="dropdown-arrow">▾</span>
              </span>
              <div className="nav-dropdown">
                <Link
                  href={dropdown.href}
                  className="nav-dropdown-all"
                  onClick={() => setIsOpen(false)}
                >
                  View All {dropdown.label}
                </Link>
                {dropdown.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-dropdown-item"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="nav-dropdown-label">{link.label}</span>
                    <span className="nav-dropdown-note">{link.note}</span>
                  </Link>
                ))}
              </div>
            </li>
          ))}
          <li className="nav-icons">
            <Link href="/search" className="nav-icon-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
            <Link href="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>
            <CartIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
}
