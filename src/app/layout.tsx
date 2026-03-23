import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://newkalyanijewellers.lk"),
  title: "New Kalyani Jewellers | Top Jewellery Shop in Sri Lanka",
  description: "Discover exquisite handcrafted gold jewellery, precious gems and bespoke designs at New Kalyani Jewellers. Sri Lanka's premium gold and gemstone jewellery shop.",
  keywords: ["Sri Lankan jewellery shops", "Gold jewellery Sri Lanka", "Gemstones Sri Lanka", "Bespoke jewellery", "New Kalyani Jewellers", ""],
  alternates: {
    canonical: "https://newkalyanijewellers.lk",
  },
  openGraph: {
    title: "New Kalyani Jewellers | Premium Gold & Gem Jewellery",
    description: "Discover exquisite handcrafted gold jewellery, precious gems and bespoke designs at New Kalyani Jewellers. Premium quality, timeless elegance.",
    url: "https://newkalyanijewellers.lk",
    siteName: "New Kalyani Jewellers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "New Kalyani Jewellers - Premium Gold & Gem Jewellery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Kalyani Jewellers | Premium Gold & Gem Jewellery",
    description: "Discover exquisite handcrafted gold jewellery, precious gems, and bespoke designs.",
    images: ["/og-image.png"],
  },
};

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "New Kalyani Jewellers",
    "description": "Premium gold jewellery and gemstone designs in Sri Lanka",
    "url": "https://newkalyanijewellers.lk",
    "logo": "https://newkalyanijewellers.lk/logo.png",
    "image": "https://newkalyanijewellers.lk/og-image.png",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK",
      "addressLocality": "Sri Lanka"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-112 257 1482",
      "contactType": "customer service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="qPOJKZ4fKMwXtDUwGVxjUWhB8EF8X_hETxTqMtqDBtY" />
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
