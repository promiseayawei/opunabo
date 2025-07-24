"use client";

import "./globals.css";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f1a] text-white flex flex-col min-h-screen font-sans">
        <Header />
        <Toaster position="top-right" />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false); // Close menu when route changes
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book", href: "/book" },
    { label: "Contact", href: "/contact" },
  ];

  const navLinkClasses = (href: string) =>
    `hover:text-[#4282ea] transition ${
      pathname === href ? "text-[#4282ea] font-semibold" : "text-gray-300"
    }`;

  return (
    <header className="bg-[#0a0f1a] text-white p-4 sticky top-0 z-50 border-b border-[#1a1f2c]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-[#4282ea]">bricore</h1>
          <p className="text-sm font-light text-gray-400">solutions</p>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <MenuIcon />}
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <div className="absolute top-16 right-4 bg-[#111827] w-48 rounded shadow-lg z-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm text-gray-300 hover:text-[#4282ea] hover:bg-[#1f2937] transition`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0c111c] text-white py-14 px-6 text-sm mt-10 border-t border-[#1a1f2c]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h4 className="text-[#4282ea] font-semibold mb-4">About Bricore</h4>
          <p className="text-gray-400 leading-relaxed">
            We help small businesses scale through smart admin support,
            automation, and human-centered digital services.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[#4282ea] font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-gray-400">
            {["Home", "About", "Services", "Pricing", "Book", "Contact"].map(
              (p) => (
                <li key={p}>
                  <Link
                    href={`/${p.toLowerCase()}`}
                    className="hover:text-[#4282ea] transition"
                  >
                    {p}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-[#4282ea] font-semibold mb-4">Contact</h4>
          <ul className="text-gray-400 space-y-2">
            <li>Email: hello@bricore.com</li>
            <li>Phone: +234 9055 348 075</li>
            <li>Location: Abuja, Nigeria</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-[#4282ea] font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
            <Link href="#"><Facebook className="hover:text-[#4282ea]" /></Link>
            <Link href="#"><Twitter className="hover:text-[#4282ea]" /></Link>
            <Link href="https://www.linkedin.com/company/bricore-solutions"><Linkedin className="hover:text-[#4282ea]" /></Link>
            <Link href="https://www.instagram.com/bricore.solutions?igsh=bHoxbWd2aGVkcnFi&utm_source=qr"><Instagram className="hover:text-[#4282ea]" /></Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-500">
        &copy; {new Date().getFullYear()} Bricore. All rights reserved. developed by{" "}
        <Link href="#" className="hover:text-[#4282ea]">
          Ayaweisoft limited
        </Link>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const phone = "+234905348075";
  const text = "Hello Bricore, I’d like to learn more.";
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M16.72 12.28c-.54-.27-1.2-.12-1.63.3l-.3.3a1.92 1.92 0 01-2.71 0l-.35-.35a1.92 1.92 0 010-2.71l.3-.3c.42-.43.57-1.09.3-1.63A6.12 6.12 0 006.72 4.68C4.22 7.18 4 11.53 7 15a9 9 0 0012 1c1.5-1.5 2-2.91 2-4.16z" />
      </svg>
    </a>
  );
}
