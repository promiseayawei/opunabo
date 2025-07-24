'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#1C2230] py-14 px-6 text-sm mt-10 border-t border-[#1A1F2C]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">About CCMG</h4>
          <p className="text-[#F1F1F1B3] leading-relaxed">
            Chicago Capital Management Group LLC specializes in equity investment,
            capital structuring, and strategic partnerships for sustainable community growth.
          </p>
        </div>

        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-[#F1F1F1B3]">
            {["Home", "About", "Services", "Team", "Partners", "Projects", "Contact"].map((p) => (
              <li key={p}>
                <Link href={`/${p.toLowerCase()}`} className="hover:text-[#E5C97B] transition">
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4">Contact</h4>
          <ul className="text-[#F1F1F1B3] space-y-2">
            <li>Chicago Capital Management Group LLC</li>
            <li>2400 Cabot Drive, Suite 400</li>
            <li>Lisle, IL. 60532</li>
            <li>Tel. (630) 344-9734</li>
          </ul>
        </div>

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
        &copy; {year} chicagocapitalmanagementgroup.com
      </div>
    </footer>
  );
}
