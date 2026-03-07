import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Jewelry", href: "/collections" },
    { name: "Rings", href: "/collections?category=rings" },
    { name: "Necklaces", href: "/collections?category=necklaces" },
    { name: "Earrings", href: "/collections?category=earrings" },
    { name: "Bracelets", href: "/collections?category=bracelets" },
  ],
  services: [
    { name: "Custom Designs", href: "/custom" },
    { name: "Repair Services", href: "/repair" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-normal tracking-[0.2em] mb-4">
              <span className="text-primary">NEW KALYANI</span>
              <span className="ml-2">JEWELLERS</span>
            </h2>
            <p className="text-ivory/70 leading-relaxed mb-6 max-w-sm font-inter tracking-wide">
              Crafting timeless elegance with exquisite gold and diamond jewellery.
              Trusted by generations across Sri Lanka.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-inter font-medium tracking-[0.2em] uppercase mb-6 text-primary">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-ivory/70 hover:text-primary transition-colors text-sm font-inter tracking-wide">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-inter font-medium tracking-[0.2em] uppercase mb-6 text-primary">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-ivory/70 hover:text-primary transition-colors text-sm font-inter tracking-wide">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-inter font-medium tracking-[0.2em] uppercase mb-6 text-primary">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-ivory/70 font-inter tracking-wide">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  475/A Kaduwela Rd,
                  <br />
                  Sri Jayawardenepura Kotte
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ivory/70 font-inter tracking-wide">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>0112 257 1482</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ivory/70 font-inter tracking-wide">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>kj.kalyanijewellers@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ivory/50 font-inter tracking-wide">
            © 2024 New Kalyani Jewellers. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-ivory/50 font-inter tracking-wide">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/shipping" className="hover:text-primary transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
