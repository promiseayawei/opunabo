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
      <body className="bg-[#0A0F1A] text-[#F1F1F1] flex flex-col min-h-screen font-sans">
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
    setOpen(false); // Close mobile menu on route change
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Partners", href: "/partners" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  const navLinkClasses = (href: string) =>
    `transition hover:text-[#E5C97B] ${pathname === href ? "text-[#D4AF37] font-semibold" : "text-[#F1F1F1B3]"
    }`;

  return (
    <header className="bg-[#0A0F1A] p-4 sticky top-0 z-50 border-b border-[#1A1F2C]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-[#D4AF37]">CCMG</h1>
          <p className="text-sm font-light text-[#F1F1F1B3]">LLC</p>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <MenuIcon />}
        </button>

        {open && (
          <div className="absolute top-16 right-4 bg-[#1C2230] w-48 rounded shadow-lg z-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm text-[#F1F1F1B3] hover:text-[#E5C97B] hover:bg-[#2A2F3C] transition"
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
   <footer className="bg-[#1C2230] py-14 px-6 text-sm mt-10 border-t border-[#1A1F2C]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">About CCMG</h4>
          <p className="text-[#F1F1F1B3] leading-relaxed">
            Chicago Capital Management Group LLC specializes in equity investment, capital structuring, and strategic partnerships for sustainable community growth.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-[#F1F1F1B3]">
            {["Home", "About", "Services", "Team", "Partners", "Projects", "Contact"].map((p) => (
              <li key={p}>
                <Link
                  href={`/${p.toLowerCase()}`}
                  className="hover:text-[#E5C97B] transition"
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">Contact</h4>
          <ul className="text-[#F1F1F1B3] space-y-2">
            <li>Chicago Capital Management Group LLC</li>
            <li>2400 Cabot Drive</li>
            <li>Suite 400</li>
            <li>Lisle, IL. 60532</li>
            <li>Tel. (630) 344-9734</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-[#F1F1F1B3]">
            <Link href="#"><Facebook className="hover:text-[#E5C97B]" /></Link>
            <Link href="#"><Twitter className="hover:text-[#E5C97B]" /></Link>
            <Link href="#"><Linkedin className="hover:text-[#E5C97B]" /></Link>
            <Link href="#"><Instagram className="hover:text-[#E5C97B]" /></Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-[#F1F1F1B3]">
        &copy; {new Date().getFullYear()} chicagocapitalmanagementgroup.com
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
