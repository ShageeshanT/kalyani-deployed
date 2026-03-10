"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Grid3X3,
  List,
  ShoppingCart,
  Gem,
  Loader2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  pendants: "Pendants",
  bangles: "Bangles",
};

const MATERIAL_LABELS: Record<string, string> = {
  all: "All Materials",
  gold_24k: "24K Gold",
  gold_22k: "22K Gold",
  gold_18k: "18K Gold",
  gold_14k: "14K Gold",
  silver: "Silver",
  platinum: "Platinum",
  rose_gold: "Rose Gold",
  white_gold: "White Gold",
};

const CATEGORIES = [
  "all",
  "rings",
  "necklaces",
  "earrings",
  "bracelets",
  "pendants",
  "bangles",
] as const;

const MATERIALS = [
  "all",
  "gold_24k",
  "gold_22k",
  "gold_18k",
  "gold_14k",
  "silver",
  "platinum",
  "rose_gold",
  "white_gold",
] as const;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ── Component ─────────────────────────────────────────────────────────────────

function CollectionsContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  // Pre-fill filters from URL params (?category=rings  or  ?search=gold)
  const urlCategory = searchParams.get("category") ?? "all";
  const urlSearch   = searchParams.get("search")   ?? "";

  const validCategory = (CATEGORIES as readonly string[]).includes(urlCategory)
    ? urlCategory
    : "all";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(validCategory);
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["collections-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any[];
    },
  });

  const maxPrice = useMemo(() => {
    if (!products.length) return 2000000;
    const max = Math.max(...products.map((p) => Number(p.price_lkr) || 0));
    return Math.ceil(max / 100000) * 100000 || 2000000;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price_lkr) || 0;
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "all" || p.category === selectedCategory) &&
        (selectedMaterial === "all" || p.material === selectedMaterial) &&
        price >= priceRange[0] &&
        price <= priceRange[1]
      );
    });
  }, [products, searchQuery, selectedCategory, selectedMaterial, priceRange]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [products]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedMaterial !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchQuery.length > 0;

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setPriceRange([0, maxPrice]);
    setSearchQuery("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price_lkr) || 0,
      image: product.images?.[0] ?? "",
      category: product.category ?? "",
      slug: product.slug ?? product.id,
    });
  };

  const filterPanel = (
    <div className="space-y-8">
      {/* Price range */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-4">
          Price Range
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          max={maxPrice}
          step={10000}
          className="mb-3"
        />
        <p className="font-inter text-sm text-[#C49B08]">
          LKR {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
        </p>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-3">
          Category
        </h3>
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-inter transition-colors ${
                selectedCategory === cat
                  ? "bg-[#C49B08]/10 text-[#C49B08] font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{CATEGORY_LABELS[cat]}</span>
              <span className={`text-xs ${selectedCategory === cat ? "text-[#C49B08]" : "text-gray-400"}`}>
                {categoryCounts[cat] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-3">
          Material
        </h3>
        <div className="space-y-0.5">
          {MATERIALS.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${
                selectedMaterial === mat
                  ? "bg-[#C49B08]/10 text-[#C49B08] font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {MATERIAL_LABELS[mat]}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center gap-1.5 text-sm font-inter text-gray-500 hover:text-red-500 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-5">
              JEWELLERY COLLECTION
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="font-inter text-sm text-gray-400 tracking-wide max-w-md mx-auto leading-relaxed">
              Handcrafted pieces that celebrate Sri Lankan artistry and timeless elegance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-inter border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#C49B08]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 text-sm font-inter text-gray-700 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-[#C49B08] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">·</span>
                )}
              </button>

              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <span className="text-sm text-gray-400 font-inter hidden sm:block">
                {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {filtersOpen && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              {filterPanel}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-52 flex-shrink-0">
              <div className="sticky top-24">{filterPanel}</div>
            </aside>

            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C49B08]" />
                  <p className="text-sm text-gray-400 font-inter">Loading collection...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Gem className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="font-inter text-gray-500 text-center">
                    {products.length === 0
                      ? "No products available yet. Check back soon."
                      : "No products match your filters."}
                  </p>
                  {products.length > 0 && (
                    <button onClick={clearFilters} className="text-sm text-[#C49B08] hover:underline font-inter">
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredProducts.map((product) => {
                    const image = product.images?.[0] ?? null;
                    const isOutOfStock = product.stock_quantity === 0;

                    return (
                      <div
                        key={product.id}
                        className={`group relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#C49B08]/30 ${
                          viewMode === "list" ? "flex flex-row" : ""
                        }`}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div
                          className={`relative overflow-hidden bg-gray-50 ${
                            viewMode === "list" ? "w-40 h-40 flex-shrink-0" : "aspect-square"
                          }`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Gem className="h-10 w-10 text-gray-200" />
                            </div>
                          )}

                          <div className="absolute top-2.5 left-2.5">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-inter font-medium px-2 py-0.5 rounded-full border border-gray-200 capitalize">
                              {CATEGORY_LABELS[product.category] ?? product.category}
                            </span>
                          </div>

                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                              <span className="bg-white border border-gray-300 text-gray-500 text-xs font-inter px-3 py-1 rounded-full">
                                Out of Stock
                              </span>
                            </div>
                          )}

                          {viewMode === "grid" && !isOutOfStock && (
                            <div
                              className={`absolute inset-x-0 bottom-0 flex justify-center pb-3 transition-all duration-300 ${
                                hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                              }`}
                            >
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-xs tracking-wider px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-colors"
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Add to Cart
                              </button>
                            </div>
                          )}
                        </div>

                        <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                          <div>
                            <Link href={`/product/${product.slug || product.id}`}>
                              <h3 className="font-inter text-sm tracking-wide text-gray-900 group-hover:text-[#C49B08] transition-colors line-clamp-2 leading-snug mb-1">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-gray-400 font-inter capitalize">
                              {MATERIAL_LABELS[product.material] ?? product.material}
                            </p>
                          </div>

                          <div className={`flex items-center justify-between ${viewMode === "list" ? "mt-4" : "mt-3"}`}>
                            <span className="font-inter text-sm font-semibold text-gray-900">
                              LKR {formatPrice(Number(product.price_lkr) || 0)}
                            </span>
                            {viewMode === "list" && !isOutOfStock && (
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-xs tracking-wider px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-inter tracking-widest text-sm uppercase">Loading…</div>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}
