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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("id, name, price_lkr, slug, images")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(4)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded mb-4" />
                <div className="h-3 bg-muted rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-inter">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-inter font-light tracking-[0.2em] mt-4">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center text-primary font-inter text-sm mt-4 md:mt-0 hover:gap-3 transition-all gap-2 tracking-wide"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden bg-muted mb-4">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                    <span className="text-gold/30 text-xs font-inter tracking-widest uppercase">No Image</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-inter text-xs md:text-sm tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm mt-1 font-inter tracking-wide">
                  FROM RS {formatPrice(product.price_lkr)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
