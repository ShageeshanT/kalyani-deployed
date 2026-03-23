"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  price_lkr: number;
  slug: string;
  images: string[] | null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function JewellerySection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("id, name, price_lkr, slug, images")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden border border-gray-100">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4">
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Our Collection
            </p>
            <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-3">
              JEWELLERY
            </h2>
            <div className="w-10 h-px bg-[#C49B08]/50" />
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 mt-6 md:mt-0 font-inter text-xs text-[#C49B08] hover:text-[#a8840a] tracking-[0.15em] uppercase transition-colors group"
          >
            View Full Collection
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#C49B08]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#C49B08]/30 text-[10px] font-inter tracking-widest uppercase">
                      No Image
                    </span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-3.5">
                <h3 className="font-inter text-[11px] tracking-[0.12em] uppercase text-gray-800 group-hover:text-[#C49B08] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="font-inter text-[11px] text-gray-400 mt-1.5 tracking-wide">
                  LKR {formatPrice(product.price_lkr)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 px-8 py-3 border border-[#C49B08] text-[#C49B08] hover:bg-[#C49B08] hover:text-white font-inter text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 group"
          >
            Browse Full Collection
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
