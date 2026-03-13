"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Mock products for fallback
const necklace1 = "/products/necklace-1.jpg";
const bracelet1 = "/products/bracelet-1.jpg";
const pendant1 = "/products/pendant-1.jpg";
const ring1 = "/products/ring-1.jpg";

const mockProducts: Record<string, {
  id: string;
  name: string;
  price_lkr: number;
  description: string;
  images: string[];
  category: string;
  material: string;
  weight_grams: number;
  dimensions: string;
  gemstone_details: string;
}> = {
  "1": {
    id: "1",
    name: "Temple Lakshmi Necklace",
    price_lkr: 185000,
    description: "A stunning traditional temple necklace featuring intricate Lakshmi motifs, handcrafted by master artisans. This piece embodies the rich heritage of South Asian jewelry making, perfect for bridal occasions and special celebrations.",
    images: [necklace1, necklace1],
    category: "necklaces",
    material: "22K Gold",
    weight_grams: 45,
    dimensions: "18 inches length",
    gemstone_details: "Ruby and emerald accents",
  },
  "2": {
    id: "2",
    name: "Leaf Vine Cuff Bracelet",
    price_lkr: 95000,
    description: "An elegant cuff bracelet featuring delicate leaf and vine motifs, inspired by nature's beauty. Perfect for both casual and formal occasions.",
    images: [bracelet1, bracelet1],
    category: "bracelets",
    material: "22K Gold",
    weight_grams: 28,
    dimensions: "2.5 inches diameter",
    gemstone_details: "None",
  },
  "3": {
    id: "3",
    name: "Sunburst Diamond Pendant",
    price_lkr: 125000,
    description: "A radiant sunburst pendant featuring brilliant cut diamonds set in 18K gold. The perfect statement piece that catches light beautifully.",
    images: [pendant1, pendant1],
    category: "pendants",
    material: "18K Gold",
    weight_grams: 12,
    dimensions: "1.5 inches diameter",
    gemstone_details: "0.5 carat total diamond weight",
  },
  "4": {
    id: "4",
    name: "Swirl Diamond Ring",
    price_lkr: 78000,
    description: "A graceful swirl design ring adorned with sparkling diamonds. This contemporary piece adds elegance to any ensemble.",
    images: [ring1, ring1],
    category: "rings",
    material: "18K Gold",
    weight_grams: 8,
    dimensions: "Size adjustable",
    gemstone_details: "0.25 carat diamond",
  },
};

interface Product {
  id: string;
  name: string;
  slug?: string;
  price_lkr: number;
  description: string | null;
  images: string[] | null;
  category: string;
  material: string;
  weight_grams: number | null;
  dimensions: string | null;
  gemstone_details: string | null;
}

export default function ProductDetail({ id }: { id: string }) {
  // id is passed as a prop from the page route
  const { toast } = useToast();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistRowId, setWishlistRowId] = useState<string | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      
      try {
        // Try by slug first (most common case)
        const { data: slugData } = await supabase
          .from("products")
          .select("*")
          .eq("slug", id)
          .maybeSingle();

        if (slugData) {
          setProduct(slugData);
        } else {
          // Try by UUID id as fallback
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
          if (isUUID) {
            const { data: idData } = await supabase
              .from("products")
              .select("*")
              .eq("id", id)
              .maybeSingle();
            if (idData) setProduct(idData);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Check wishlist status whenever product or user changes
  useEffect(() => {
    if (!user || !product) {
      setIsWishlisted(false);
      setWishlistRowId(null);
      return;
    }
    const checkWishlist = async () => {
      const { data } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();
      if (data) {
        setIsWishlisted(true);
        setWishlistRowId(data.id);
      } else {
        setIsWishlisted(false);
        setWishlistRowId(null);
      }
    };
    checkWishlist();
  }, [user, product]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatMaterial = (material: string) => {
    return material.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save items to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    if (!product) return;
    setWishlistLoading(true);

    try {
      if (isWishlisted && wishlistRowId) {
        // Remove from wishlist
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("id", wishlistRowId);
        if (error) throw error;
        setIsWishlisted(false);
        setWishlistRowId(null);
        toast({ title: "Removed from wishlist", description: `${product.name} removed.` });
      } else {
        // Add to wishlist
        const { data, error } = await supabase
          .from("wishlists")
          .insert({ user_id: user.id, product_id: product.id })
          .select("id")
          .single();
        if (error) throw error;
        setIsWishlisted(true);
        setWishlistRowId(data.id);
        toast({ title: "Added to wishlist", description: `${product.name} saved.` });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setWishlistLoading(false);
    }
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images!.length) % product.images!.length);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-gray-400 font-inter">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
          <h1 className="text-2xl font-inter font-light text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-500 font-inter mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/collections">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-inter tracking-wider">
              Browse Collections
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : ["/placeholder.svg"];

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 md:mb-8">
            <ol className="flex items-center gap-2 text-sm font-inter">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/collections" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Collections
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-900" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-900" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? "border-[#C49B08]" : "border-gray-200"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 font-inter uppercase tracking-[0.2em] mb-2">
                  {product.category.replace("_", " ")}
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-inter font-light tracking-wide text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl md:text-3xl font-inter text-[#C49B08]">
                  RS {formatPrice(product.price_lkr)}
                </p>
              </div>

              {product.description && (
                <p className="text-gray-600 font-inter font-light leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Product Details */}
              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <h3 className="font-inter font-medium tracking-wide text-gray-900">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                  <div>
                    <p className="text-gray-500">Material</p>
                    <p className="text-gray-900 font-medium">{formatMaterial(product.material)}</p>
                  </div>
                  {product.weight_grams && (
                    <div>
                      <p className="text-gray-500">Weight</p>
                      <p className="text-gray-900 font-medium">{product.weight_grams}g</p>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p className="text-gray-900 font-medium">{product.dimensions}</p>
                    </div>
                  )}
                  {product.gemstone_details && (
                    <div>
                      <p className="text-gray-500">Gemstones</p>
                      <p className="text-gray-900 font-medium">{product.gemstone_details}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div>
                <Button
                  onClick={handleAddToWishlist}
                  disabled={wishlistLoading}
                  variant="outline"
                  className={`w-full h-12 font-inter tracking-[0.15em] uppercase transition-all disabled:opacity-60 ${
                    isWishlisted
                      ? "bg-[#C49B08] text-white border-[#C49B08] hover:bg-[#C49B08]/90"
                      : "border-[#C49B08] text-[#C49B08] hover:bg-[#C49B08]/10"
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {wishlistLoading ? "Saving..." : isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 space-y-3 text-sm font-inter text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C49B08] rounded-full"></span>
                  Free shipping on orders over RS 50,000
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C49B08] rounded-full"></span>
                  Certificate of authenticity included
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C49B08] rounded-full"></span>
                  7-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

