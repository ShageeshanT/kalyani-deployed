"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and exclusive offers.",
    });
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="bg-[#0f0e0b] relative overflow-hidden py-20 md:py-24">
      {/* Soft gold glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C49B08]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[#C49B08]/4 blur-3xl pointer-events-none" />

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C49B08]/40 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-xl mx-auto text-center">

          {/* Label */}
          <p className="font-inter text-[11px] tracking-[0.45em] uppercase text-[#C49B08] mb-5">
            Stay Connected
          </p>

          {/* Heading */}
          <h2 className="font-inter text-3xl md:text-4xl font-light tracking-[0.2em] text-white mb-4">
            JOIN OUR CIRCLE
          </h2>

          {/* Gold rule */}
          <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-6" />

          {/* Subtext */}
          <p className="font-inter text-sm text-white/45 tracking-wide leading-relaxed mb-10 px-4">
            Subscribe for exclusive offers, new collection alerts, and jewellery
            care tips. Be the first to know about our special events.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 bg-white/6 border border-white/12 rounded-lg font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C49B08]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-xs tracking-[0.15em] uppercase rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="font-inter text-[11px] text-white/25 mt-5 tracking-wide">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>

        </div>
      </div>
    </section>
  );
}
