"use client";

import { useState } from "react";
import { Facebook, Instagram, Youtube, Share2, X } from "lucide-react";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/94112571482",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="h-4 w-4" />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="h-4 w-4" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: <Youtube className="h-4 w-4" />,
  },
];

export function FloatingSocialButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 top-[50%] -translate-y-1/2 z-40 flex flex-col items-center gap-2.5">

      {/* Social icons — slide & fade in from below trigger */}
      <div className="flex flex-col items-center gap-2.5">
        {socialLinks.map((social, index) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="w-9 h-9 rounded-full bg-[#0f0e0b] border border-white/15 text-white/55 flex items-center justify-center shadow-lg transition-all duration-300 hover:border-[#C49B08] hover:text-[#C49B08] hover:scale-110 hover:shadow-[0_0_16px_rgba(196,155,8,0.3)]"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
              pointerEvents: isOpen ? "auto" : "none",
              transition: `opacity 0.25s ease, transform 0.25s ease, border-color 0.3s, color 0.3s, box-shadow 0.3s`,
              transitionDelay: isOpen
                ? `${index * 55}ms`
                : `${(socialLinks.length - 1 - index) * 40}ms`,
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Toggle trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close social links" : "Open social links"}
        className="w-9 h-9 rounded-full bg-[#C49B08] hover:bg-[#a8840a] text-[#0f0e0b] flex items-center justify-center shadow-lg shadow-[#C49B08]/25 transition-all duration-300 hover:scale-110"
      >
        <span
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </span>
      </button>

    </div>
  );
}
