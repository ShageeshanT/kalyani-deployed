"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-inter font-light tracking-wide text-gray-900 mb-3">
              Shopping Cart
            </h1>
            <p className="text-gray-500 font-inter font-light">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 font-inter font-light mb-8">
                Your cart is empty
              </p>
              <Link href="/collections">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-inter tracking-wider px-8">
                  Browse Collections
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  {/* Image — click goes to product */}
                  <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                      {item.image && item.image !== "/placeholder.svg" ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#C49B08]/20 to-[#C49B08]/5" />
                      )}
                    </div>
                  </Link>

                  {/* Details — click goes to product */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-inter uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="font-inter font-light text-gray-900 mb-2 hover:text-[#C49B08] transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[#C49B08] font-inter font-medium">
                      RS {formatPrice(item.price)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-400 font-inter mt-1">
                        RS {formatPrice(item.price * item.quantity)} total
                      </p>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2.5 hover:bg-gray-100 transition-colors text-gray-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 font-inter text-sm text-gray-900 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2.5 hover:bg-gray-100 transition-colors text-gray-700"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                <span className="text-gray-900 font-inter font-medium text-lg">Total</span>
                <span className="text-[#C49B08] font-inter font-semibold text-xl">
                  RS {formatPrice(cartTotal)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
