"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  price_lkr: number;
  images: string[] | null;
  category: string;
  material: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, price_lkr, images, category, material")
        .eq("is_active", true)
        .or(`name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%,material.ilike.%${searchQuery}%`)
        .limit(50);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
    router.push("/search");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const popularSearches = [
    "Gold Rings",
    "Diamond Necklace",
    "Wedding Bands",
    "Earrings",
    "Bracelets",
    "Pendants",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-5">
              SEARCH
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="text-gray-400 font-inter text-sm tracking-wide">
              Find your perfect piece of jewellery
            </p>
          </div>

          <form onSubmit={handleSearch} className="mb-10">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for rings, necklaces, earrings..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-10 h-12 font-inter text-sm border-gray-300 focus:border-[#C49B08] bg-white text-gray-900 placeholder:text-gray-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                className="h-12 px-5 sm:px-8 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider text-sm"
              >
                Search
              </Button>
            </div>
          </form>

          {!searched && (
            <div className="text-center">
              <p className="text-sm text-gray-400 font-inter mb-4">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                      performSearch(term);
                    }}
                    className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-full text-sm font-inter hover:border-[#C49B08] hover:text-[#C49B08] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="animate-pulse text-gray-400 font-inter">Searching...</div>
            </div>
          )}

          {searched && !loading && (
            <>
              <p className="text-sm text-gray-400 font-inter mb-6">
                {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
              </p>

              {results.length === 0 ? (
                <div className="text-center py-16">
                  <SearchIcon className="h-16 w-16 text-gray-200 mx-auto mb-6" />
                  <p className="text-gray-500 font-inter font-light mb-4">
                    No products found for &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-gray-400 font-inter mb-8">
                    Try searching with different keywords
                  </p>
                  <Link href="/collections">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white font-inter tracking-wider">
                      Browse All Collections
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#C49B08]/30 transition-all duration-300">
                        <div className="aspect-square bg-gray-50 relative overflow-hidden">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <SearchIcon className="h-8 w-8 text-gray-200" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wider mb-1">
                            {product.category.replace("_", " ")}
                          </p>
                          <h3 className="font-inter text-xs md:text-sm text-gray-900 mb-1 line-clamp-2 leading-snug group-hover:text-[#C49B08] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[#C49B08] font-inter font-semibold text-xs md:text-sm">
                            LKR {formatPrice(product.price_lkr)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default function Search() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-inter">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
