"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  {
    name: "Rings",
    slug: "rings",
    description: "Elegant bands & statement pieces",
    images: [
      "/heroimages/rings/THA_6074.jpg",
      "/heroimages/rings/THA_6097.jpg",
      "/heroimages/rings/THA_6151.jpg",
    ],
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Chains, pendants & chokers",
    images: [
      "/heroimages/necklace/THA_6198.jpg",
      "/heroimages/necklace/THA_6255.jpg",
      "/heroimages/necklace/THA_6823.jpg",
    ],
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "Studs, drops & hoops",
    images: [
      "/heroimages/earrings/THA_6215.jpg",
      "/heroimages/earrings/THA_6220.jpg",
      "/heroimages/earrings/THA_6247.jpg",
    ],
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description: "Bangles & charm bracelets",
    images: [
      "/heroimages/bracelets/THA_6877.jpg",
      "/heroimages/bracelets/THA_6894.jpg",
      "/heroimages/bracelets/THA_6905.jpg",
    ],
  },
];

interface CategoryCardProps {
  category: (typeof categories)[number];
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Stagger each card's start so they don't all transition at the same moment
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % category.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, index * 900);

    return () => clearTimeout(initialDelay);
  }, [category.images.length, index]);

  return (
    <Link
      href={`/collections?category=${category.slug}`}
      className="group relative overflow-hidden rounded-lg animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Images stacked — crossfade between them */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {category.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${category.name} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out group-hover:scale-110 transition-transform ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: "scale(1)",
              transition: "opacity 1.2s ease-in-out, transform 0.7s ease-out",
            }}
          />
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#C49B08]/50 rounded-lg transition-all duration-300" />

      {/* Dot indicators */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {category.images.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-4 h-1 bg-[#C49B08]"
                : "w-1 h-1 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        {/* Gold rule */}
        <div className="w-6 h-px bg-[#C49B08]/70 mb-2.5 group-hover:w-10 transition-all duration-300" />
        <h3 className="font-inter text-base sm:text-lg md:text-xl font-light tracking-[0.15em] text-white mb-1 group-hover:text-[#C49B08] transition-colors duration-300">
          {category.name}
        </h3>
        <p className="font-inter text-[11px] sm:text-xs text-white/55 tracking-wide">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0f0e0b]">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="font-inter text-[11px] tracking-[0.45em] uppercase text-[#C49B08] mb-4">
            Our Collections
          </p>
          <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white mb-4">
            Shop by Category
          </h2>
          <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-5" />
          <p className="text-white/45 max-w-xl mx-auto font-inter text-sm tracking-wide px-4 leading-relaxed">
            Explore our exquisite collections, each piece meticulously crafted to
            celebrate life&apos;s precious moments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
