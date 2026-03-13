"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Heart, Trash2, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  product_id: string;
  products: {
    id: string;
    name: string;
    price_lkr: number;
    images: string[] | null;
    category: string;
    slug: string;
  };
}

export default function Wishlist() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            price_lkr,
            images,
            category,
            slug
          )
        `)
        .eq("user_id", user!.id);

      if (error) throw error;
      setWishlistItems(data as unknown as WishlistItem[]);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;
      setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));
      toast({ title: "Removed from wishlist" });
    } catch {
      toast({ title: "Error", description: "Failed to remove item.", variant: "destructive" });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  /* ─── Loading ─── */
  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#C49B08]" />
        </div>
      </Layout>
    );
  }

  /* ─── Not signed in ─── */
  if (!user) {
    return (
      <Layout>
        {/* Gold accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

        <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center px-4 py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C49B08]/30 bg-[#C49B08]/5 mb-6">
            <Heart className="h-7 w-7 text-[#C49B08]/60" />
          </div>
          <h1 className="font-display text-3xl font-light tracking-[0.15em] text-gray-900 mb-3 text-center">
            My Wishlist
          </h1>
          <div className="w-8 h-px bg-[#C49B08]/50 mx-auto mb-4" />
          <p className="font-inter text-sm text-gray-400 tracking-wide text-center mb-8">
            Sign in to save and view your favourite pieces
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 h-11 px-8 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors"
          >
            Sign In
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Gold accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

      <div className="min-h-screen bg-[#fafaf9] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* ── Page header ── */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-[0.15em] text-gray-900">
              My Wishlist
            </h1>
            <div className="w-8 h-px bg-[#C49B08]/50 mx-auto mt-3" />
            <p className="font-inter text-xs text-gray-400 tracking-wide mt-3">
              {wishlistItems.length === 0
                ? "No saved pieces yet"
                : `${wishlistItems.length} ${wishlistItems.length === 1 ? "piece" : "pieces"} saved`}
            </p>
          </div>

          {/* ── Empty state ── */}
          {wishlistItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C49B08]/30 bg-[#C49B08]/5 mb-6">
                <Heart className="h-7 w-7 text-[#C49B08]/60" />
              </div>
              <p className="font-display text-xl font-light tracking-wide text-gray-700 mb-2">
                Nothing saved yet
              </p>
              <p className="font-inter text-xs text-gray-400 tracking-wide mb-8">
                Explore our collection and save the pieces you love
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 h-11 px-8 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors"
              >
                Browse Collections
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#C49B08]/40 hover:shadow-md transition-all duration-300"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.products?.slug || item.product_id}`} className="block relative overflow-hidden aspect-square bg-gray-50">
                      {item.products?.images?.[0] ? (
                        <img
                          src={item.products.images[0]}
                          alt={item.products.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#C49B08]/15 to-[#C49B08]/5 flex items-center justify-center">
                          <Heart className="h-10 w-10 text-[#C49B08]/20" />
                        </div>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.preventDefault(); removeFromWishlist(item.id); }}
                        aria-label="Remove from wishlist"
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </Link>

                    {/* Details */}
                    <div className="p-3.5">
                      <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#C49B08] mb-1">
                        {item.products?.category?.replace(/_/g, " ")}
                      </p>
                      <Link href={`/product/${item.products?.slug || item.product_id}`}>
                        <h3 className="font-display text-sm font-light tracking-wide text-gray-900 hover:text-[#C49B08] transition-colors leading-snug line-clamp-2">
                          {item.products?.name}
                        </h3>
                      </Link>
                      <p className="font-inter text-sm font-medium text-[#C49B08] mt-1.5">
                        RS {formatPrice(item.products?.price_lkr || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="text-center mt-10">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-[#C49B08] transition-colors"
                >
                  ← Continue Browsing
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
}
