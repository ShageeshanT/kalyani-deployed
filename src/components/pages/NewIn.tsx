"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ShoppingCart, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price_lkr: number;
  slug: string;
  images: string[] | null;
  category: string | null;
  material: string | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  pendants: "Pendants",
  bangles: "Bangles",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function NewIn() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("id, name, price_lkr, slug, images, category, material")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(12)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price_lkr,
      image: product.images?.[0] ?? "",
      category: product.category ?? "",
      slug: product.slug,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-5">
              NEW ARRIVALS
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="font-inter text-sm text-gray-400 tracking-wide max-w-md mx-auto leading-relaxed">
              Our newest additions — handcrafted pieces that blend timeless elegance with contemporary design
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Products grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#C49B08]/30 transition-all duration-300"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-10 w-10 text-gray-200" />
                      </div>
                    )}

                    {/* NEW badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#C49B08] text-white text-[9px] font-inter font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        New
                      </span>
                    </div>

                    {/* Category chip */}
                    {product.category && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-[9px] font-inter px-2 py-0.5 rounded-full border border-gray-200 capitalize">
                          {CATEGORY_LABELS[product.category] ?? product.category}
                        </span>
                      </div>
                    )}

                    {/* Add to cart on hover */}
                    <div
                      className={`absolute inset-x-0 bottom-0 flex justify-center pb-3 transition-all duration-300 ${
                        hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-inter text-xs md:text-sm tracking-wide text-gray-900 group-hover:text-[#C49B08] transition-colors line-clamp-2 leading-snug mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-inter text-xs font-semibold text-gray-900">
                      LKR {formatPrice(product.price_lkr)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && products.length === 0 && (
            <div className="text-center py-24">
              <p className="font-inter text-gray-400 tracking-wide text-sm">
                New arrivals coming soon. Check back later.
              </p>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
