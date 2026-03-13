"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <Layout>
      {/* Gold accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

      <div className="min-h-screen bg-[#fafaf9] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ── Page header ── */}
          <div className="text-center mb-10">
            <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-[#C49B08] mb-2">
              New Kalyani Jewellers
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-[0.15em] text-gray-900">
              My Bag
            </h1>
            <div className="w-8 h-px bg-[#C49B08]/50 mx-auto mt-3" />
            <p className="font-inter text-xs text-gray-400 tracking-wide mt-3">
              {cartItems.length === 0
                ? "Your bag is empty"
                : `${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your bag`}
            </p>
          </div>

          {/* ── Empty state ── */}
          {cartItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C49B08]/30 bg-[#C49B08]/5 mb-6">
                <ShoppingBag className="h-7 w-7 text-[#C49B08]/60" />
              </div>
              <p className="font-display text-xl font-light tracking-wide text-gray-700 mb-2">
                Nothing here yet
              </p>
              <p className="font-inter text-xs text-gray-400 tracking-wide mb-8">
                Discover our curated collection of fine jewellery
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
            /* ── Two-column layout on desktop ── */
            <div className="lg:grid lg:grid-cols-5 lg:gap-8">

              {/* ── Cart items (left, 3 cols) ── */}
              <div className="lg:col-span-3 space-y-3 mb-6 lg:mb-0">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#C49B08]/30 transition-colors duration-200 shadow-sm"
                  >
                    {/* Product image */}
                    <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                        {item.image && item.image !== "/placeholder.svg" ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#C49B08]/15 to-[#C49B08]/5 flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-[#C49B08]/30" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#C49B08] mb-1">
                          {item.category}
                        </p>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-display text-base font-light tracking-wide text-gray-900 hover:text-[#C49B08] transition-colors leading-snug truncate">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <div>
                        <p className="font-inter text-sm font-medium text-[#C49B08]">
                          RS {formatPrice(item.price)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-inter text-[11px] text-gray-400 mt-0.5">
                            RS {formatPrice(item.price * item.quantity)} total
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end justify-between flex-shrink-0 py-1">
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-[#C49B08]/10 hover:text-[#C49B08] transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-inter text-sm text-gray-900 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-[#C49B08]/10 hover:text-[#C49B08] transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue shopping */}
                <div className="pt-2">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-[#C49B08] transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* ── Order summary (right, 2 cols) ── */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
                  {/* Summary heading */}
                  <div className="mb-5">
                    <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-[#C49B08] mb-1">
                      Summary
                    </p>
                    <h2 className="font-display text-xl font-light tracking-wide text-gray-900">
                      Order Total
                    </h2>
                    <div className="w-5 h-px bg-[#C49B08]/40 mt-2" />
                  </div>

                  {/* Line items */}
                  <div className="space-y-3 mb-5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <span className="font-inter text-xs text-gray-500 flex-1 pr-2 leading-relaxed">
                          {item.name}
                          <span className="text-gray-400"> × {item.quantity}</span>
                        </span>
                        <span className="font-inter text-xs text-gray-700 flex-shrink-0">
                          RS {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-4 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm font-medium text-gray-700 tracking-wide">
                        Total
                      </span>
                      <span className="font-display text-2xl font-light text-[#C49B08]">
                        RS {formatPrice(cartTotal)}
                      </span>
                    </div>
                    <p className="font-inter text-[10px] text-gray-400 mt-1 tracking-wide">
                      Taxes &amp; shipping calculated at checkout
                    </p>
                  </div>

                  {/* Checkout button */}
                  <button className="w-full h-12 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-[11px] tracking-[0.35em] uppercase transition-colors flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <p className="font-inter text-[10px] text-center text-gray-400 mt-4 tracking-wide">
                    Secure checkout · Free returns
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
