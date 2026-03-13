"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
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
            category
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
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return `LKR ${new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-gray-400 font-inter">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <Heart className="h-16 w-16 text-gray-300 mb-6" />
          <h1 className="text-2xl md:text-3xl font-inter font-light tracking-wide text-gray-900 mb-4">
            Your Wishlist
          </h1>
          <p className="text-gray-500 font-inter font-light text-center mb-8">
            Please sign in to view your wishlist
          </p>
          <Link href="/auth">
            <Button className="bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider">
              Sign In
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-5">
              YOUR WISHLIST
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-4" />
            <p className="text-gray-400 font-inter text-sm">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-200 mx-auto mb-6" />
              <p className="text-gray-500 font-inter font-light mb-8">
                Your wishlist is empty
              </p>
              <Link href="/collections">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-inter tracking-wider">
                  Browse Collections
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#C49B08]/30 transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    {item.products?.images?.[0] ? (
                      <img
                        src={item.products.images[0]}
                        alt={item.products.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="h-12 w-12 text-gray-200" />
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wider mb-1">
                      {item.products?.category?.replace("_", " ")}
                    </p>
                    <h3 className="font-inter text-xs md:text-sm text-gray-900 mb-1 line-clamp-2 leading-snug">
                      {item.products?.name}
                    </h3>
                    <p className="text-[#C49B08] font-inter font-semibold text-xs md:text-sm mb-3">
                      {formatPrice(item.products?.price_lkr || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

