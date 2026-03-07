"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Slider } from "@/components/ui/slider";
import { Search, Gem, Loader2, X, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

// ── Constants ─────────────────────────────────────────────────────────────────

const GEM_TYPES = [
  { value: "all", label: "All Gems" },
  { value: "blue_sapphire", label: "Blue Sapphire" },
  { value: "ruby", label: "Ruby" },
  { value: "emerald", label: "Emerald" },
  { value: "diamond", label: "Diamond" },
  { value: "yellow_sapphire", label: "Yellow Sapphire" },
  { value: "cats_eye", label: "Cat's Eye" },
  { value: "pink_sapphire", label: "Pink Sapphire" },
  { value: "alexandrite", label: "Alexandrite" },
  { value: "spinel", label: "Spinel" },
  { value: "other", label: "Other" },
] as const;

// Gem type → accent color
const GEM_COLORS: Record<string, string> = {
  blue_sapphire: "#1E5FA8",
  ruby: "#C0392B",
  emerald: "#27AE60",
  diamond: "#7F8C8D",
  yellow_sapphire: "#F39C12",
  cats_eye: "#8E6B3E",
  pink_sapphire: "#E91E8C",
  alexandrite: "#6C3483",
  spinel: "#D35400",
  other: "#95A5A6",
};

const ORIGIN_OPTIONS = [
  "all",
  "Sri Lanka",
  "Burma",
  "Colombia",
  "Madagascar",
  "Mozambique",
  "Thailand",
  "Brazil",
  "Other",
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function getGemLabel(value: string): string {
  return GEM_TYPES.find((t) => t.value === value)?.label ?? value;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Gems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: gems = [], isLoading } = useQuery({
    queryKey: ["gems-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gems")
        .select("*")
        .eq("is_available", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  const maxPrice = useMemo(() => {
    if (!gems.length) return 5000000;
    const max = Math.max(...gems.map((g) => Number(g.price_lkr) || 0));
    return Math.ceil(max / 100000) * 100000 || 5000000;
  }, [gems]);

  const filteredGems = useMemo(() => {
    return gems.filter((g) => {
      const price = Number(g.price_lkr) || 0;
      return (
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedType === "all" || g.gem_type === selectedType) &&
        (selectedOrigin === "all" || g.origin === selectedOrigin) &&
        price >= priceRange[0] &&
        price <= priceRange[1]
      );
    });
  }, [gems, searchQuery, selectedType, selectedOrigin, priceRange]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: gems.length };
    gems.forEach((g) => {
      counts[g.gem_type] = (counts[g.gem_type] ?? 0) + 1;
    });
    return counts;
  }, [gems]);

  const hasActiveFilters =
    selectedType !== "all" ||
    selectedOrigin !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchQuery.length > 0;

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedOrigin("all");
    setPriceRange([0, maxPrice]);
    setSearchQuery("");
  };

  // ── Sidebar filter panel ────────────────────────────────────────────────────
  const filterPanel = (
    <div className="space-y-8">
      {/* Gem Type */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-3">
          Gem Type
        </h3>
        <div className="space-y-0.5">
          {GEM_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-inter transition-colors ${
                selectedType === type.value
                  ? "bg-[#C49B08]/10 text-[#C49B08] font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                {type.value !== "all" && (
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: GEM_COLORS[type.value] ?? "#999" }}
                  />
                )}
                <span>{type.label}</span>
              </div>
              <span className={`text-xs ${selectedType === type.value ? "text-[#C49B08]" : "text-gray-400"}`}>
                {typeCounts[type.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Origin */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-3">
          Origin
        </h3>
        <div className="space-y-0.5">
          {ORIGIN_OPTIONS.map((origin) => (
            <button
              key={origin}
              onClick={() => setSelectedOrigin(origin)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${
                selectedOrigin === origin
                  ? "bg-[#C49B08]/10 text-[#C49B08] font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {origin === "all" ? "All Origins" : origin}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-inter text-xs font-semibold tracking-[0.1em] text-gray-500 uppercase mb-4">
          Price Range
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          max={maxPrice}
          step={25000}
          className="mb-3"
        />
        <p className="font-inter text-sm text-[#C49B08]">
          LKR {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
        </p>
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="min-h-screen bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-5">
              PRECIOUS GEMS
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="font-inter text-sm text-gray-400 tracking-wide max-w-md mx-auto leading-relaxed">
              Rare and certified gemstones sourced from around the world — sapphires, rubies, emeralds and more
            </p>
          </div>

          {/* Search + controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search gems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm font-inter text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C49B08] transition-colors"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49B08]" />
                )}
              </button>
              <span className="text-sm text-gray-400 font-inter">
                {filteredGems.length} gem{filteredGems.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Mobile filters */}
          {filtersOpen && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              {filterPanel}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-52 flex-shrink-0">
              <div className="sticky top-24">{filterPanel}</div>
            </aside>

            {/* Gems grid */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C49B08]" />
                  <p className="text-sm text-gray-400 font-inter">Loading gems...</p>
                </div>
              ) : filteredGems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Gem className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="font-inter text-gray-500 text-center">
                    {gems.length === 0
                      ? "No gems available yet. Check back soon."
                      : "No gems match your filters."}
                  </p>
                  {gems.length > 0 && (
                    <button onClick={clearFilters} className="text-sm text-[#C49B08] hover:underline font-inter">
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredGems.map((gem: any) => {
                    const image = gem.images?.[0] ?? null;
                    const accentColor = GEM_COLORS[gem.gem_type] ?? "#C49B08";

                    return (
                      <div
                        key={gem.id}
                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-gray-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          {image ? (
                            <img
                              src={image}
                              alt={gem.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ background: `linear-gradient(135deg, ${accentColor}12, ${accentColor}05)` }}
                            >
                              <Gem className="h-12 w-12" style={{ color: `${accentColor}50` }} />
                            </div>
                          )}

                          {/* Gem type badge */}
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className="flex items-center gap-1.5 text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full text-white"
                              style={{ backgroundColor: accentColor }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"
                              />
                              {getGemLabel(gem.gem_type)}
                            </span>
                          </div>

                          {/* Featured badge */}
                          {gem.is_featured && (
                            <div className="absolute top-2.5 right-2.5">
                              <span className="bg-[#C49B08] text-white text-[9px] font-inter font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <h3 className="font-inter text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                            {gem.name}
                          </h3>

                          {/* Specs row */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {gem.carat_weight && (
                              <span className="text-[11px] font-inter text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {gem.carat_weight} ct
                              </span>
                            )}
                            {gem.cut && (
                              <span className="text-[11px] font-inter text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {gem.cut}
                              </span>
                            )}
                            {gem.origin && (
                              <span className="text-[11px] font-inter text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {gem.origin}
                              </span>
                            )}
                            {gem.treatment && (
                              <span className="text-[11px] font-inter bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                {gem.treatment}
                              </span>
                            )}
                          </div>

                          {gem.color && (
                            <p className="text-xs text-gray-400 font-inter mb-3">{gem.color}</p>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            {gem.price_lkr ? (
                              <span className="font-inter text-sm font-semibold text-gray-900">
                                LKR {formatPrice(Number(gem.price_lkr))}
                              </span>
                            ) : (
                              <span className="font-inter text-sm text-gray-400 italic">Price on request</span>
                            )}
                            <a
                              href={`/contact?gem=${encodeURIComponent(gem.name)}`}
                              className="text-xs font-inter font-medium text-white px-3 py-1.5 rounded-lg transition-colors"
                              style={{ backgroundColor: accentColor }}
                            >
                              Inquire
                            </a>
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
