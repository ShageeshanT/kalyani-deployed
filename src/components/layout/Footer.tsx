import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Jewelry",  href: "/collections" },
    { name: "Rings",        href: "/collections?category=rings" },
    { name: "Necklaces",    href: "/collections?category=necklaces" },
    { name: "Earrings",     href: "/collections?category=earrings" },
    { name: "Bracelets",    href: "/collections?category=bracelets" },
  ],
  services: [
    { name: "Custom Designs",  href: "/custom" },
    { name: "Repair Services", href: "/repair" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact",  href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0f0e0b] text-white">
      {/* Gold accent line at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-normal tracking-[0.2em] text-xl mb-1 text-white">
              NEW KALYANI
            </h2>
            <h2 className="font-display font-normal tracking-[0.2em] text-xl mb-5 text-[#C49B08]">
              JEWELLERS
            </h2>
            <div className="w-8 h-px bg-[#C49B08]/50 mb-6" />
            <p className="text-white/55 leading-relaxed mb-8 max-w-xs font-inter text-sm tracking-wide">
              Crafting timeless elegance with exquisite gold and diamond jewellery.
              Trusted by generations across Sri Lanka.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#C49B08] hover:text-[#C49B08] text-white/50 transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#C49B08] hover:text-[#C49B08] text-white/50 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#C49B08] hover:text-[#C49B08] text-white/50 transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-[0.3em] uppercase mb-6 text-[#C49B08]">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/50 hover:text-white transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-[0.3em] uppercase mb-6 text-[#C49B08]">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/50 hover:text-white transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-inter text-[11px] font-medium tracking-[0.3em] uppercase mb-4 mt-8 text-[#C49B08]">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/50 hover:text-white transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-[0.3em] uppercase mb-6 text-[#C49B08]">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C49B08] shrink-0 mt-0.5" />
                <span className="font-inter text-sm text-white/55 leading-relaxed tracking-wide">
                  475/A Kaduwela Rd,<br />
                  Sri Jayawardenepura Kotte
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#C49B08] shrink-0" />
                <a
                  href="tel:01122571482"
                  className="font-inter text-sm text-white/55 hover:text-white transition-colors tracking-wide"
                >
                  0112 257 1482
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#C49B08] shrink-0 mt-0.5" />
                <a
                  href="mailto:kj.kalyanijewellers@gmail.com"
                  className="font-inter text-sm text-white/55 hover:text-white transition-colors tracking-wide break-all"
                >
                  kj.kalyanijewellers@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-xs text-white/30 tracking-wide">
            © 2025 New Kalyani Jewellers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms"    className="font-inter text-xs text-white/30 hover:text-[#C49B08] transition-colors tracking-wide">Terms</Link>
            <Link href="/privacy"  className="font-inter text-xs text-white/30 hover:text-[#C49B08] transition-colors tracking-wide">Privacy</Link>
            <Link href="/shipping" className="font-inter text-xs text-white/30 hover:text-[#C49B08] transition-colors tracking-wide">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
