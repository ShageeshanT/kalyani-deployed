import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "New Kalyani Jewellers | Premium Gold & Gem Jewellery",
  description:
    "Discover exquisite handcrafted gold jewellery, precious gems, and bespoke designs at New Kalyani Jewellers. Premium quality, timeless elegance.",
  keywords:
    "jewellery, gold, gems, rings, necklaces, earrings, bracelets, Sri Lanka",
  icons: {
    icon: "/logo-favicon.png",
    shortcut: "/logo-favicon.png",
    apple: "/logo-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="text-foreground antialiased"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
