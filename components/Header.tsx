'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
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
    `transition hover:text-[#E5C97B] ${pathname === href
      ? "text-[#D4AF37] font-semibold"
      : "text-[#F1F1F1B3]"
    }`;

  return (
    <header className="bg-[#0A0F1A] p-4 sticky top-0 z-50 border-b border-[#1A1F2C]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/ccmg.png"
            alt="CCMG Logo"
            width={180}
            height={120}
            priority
          />
          <span className="sr-only">Chicago Capital Management Group</span>
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
