"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Search as SearchIcon, ArrowRight } from "lucide-react";

// Maps typed words → collections category slug
const CATEGORY_MAP: Record<string, string> = {
  ring: "rings",
  rings: "rings",
  necklace: "necklaces",
  necklaces: "necklaces",
  chain: "necklaces",
  chains: "necklaces",
  pendant: "pendants",
  pendants: "pendants",
  earring: "earrings",
  earrings: "earrings",
  stud: "earrings",
  studs: "earrings",
  hoop: "earrings",
  hoops: "earrings",
  bracelet: "bracelets",
  bracelets: "bracelets",
  bangle: "bangles",
  bangles: "bangles",
};

const quickCategories = [
  { label: "Rings", slug: "rings" },
  { label: "Necklaces", slug: "necklaces" },
  { label: "Earrings", slug: "earrings" },
  { label: "Bracelets", slug: "bracelets" },
  { label: "Pendants", slug: "pendants" },
  { label: "Bangles", slug: "bangles" },
];

function SearchContent() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const matched = CATEGORY_MAP[trimmed.toLowerCase()];
    if (matched) {
      router.push(`/collections?category=${matched}`);
    } else {
      router.push(`/collections?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const goToCategory = (slug: string) => {
    router.push(`/collections?category=${slug}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-4">
              SEARCH
            </h1>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-4" />
            <p className="text-gray-400 font-inter text-sm tracking-wide">
              Search by jewellery type or name
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-10">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. rings, necklaces, earrings…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 h-12 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-7 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-2 group"
              >
                Search
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick category buttons */}
          <div className="text-center">
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-5">
              Browse by Category
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {quickCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => goToCategory(cat.slug)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 font-inter text-xs tracking-[0.15em] uppercase hover:border-[#C49B08] hover:text-[#C49B08] transition-all duration-200 rounded-full"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default function Search() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-inter tracking-widest text-sm uppercase">Loading…</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
