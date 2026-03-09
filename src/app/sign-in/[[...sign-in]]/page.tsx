"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ─── LEFT: Form Panel ─── */}
      <div className="w-full lg:w-[46%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 bg-white relative">

        {/* Back to home */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-1.5 font-inter text-[11px] tracking-[0.2em] uppercase text-gray-500 hover:text-[#C49B08] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Home
        </Link>

        <div className="max-w-[360px] w-full mx-auto">

          {/* Logo + heading */}
          <div className="mb-10">
            <Image
              src="/logo.png"
              alt="New Kalyani Jewellers"
              width={44}
              height={44}
              className="mb-5 w-10 h-10 object-contain"
            />
            <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-[#C49B08] mb-2">
              Welcome Back
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-[0.15em] text-gray-900">
              Sign In
            </h1>
            <div className="w-8 h-px bg-[#C49B08]/50 mt-3" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full h-11 px-4 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 px-4 pr-11 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="font-inter text-xs text-red-500 leading-relaxed">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-60 flex items-center justify-center gap-2 group mt-1"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="font-inter text-xs text-gray-500 mt-8 text-center tracking-wide">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#C49B08] hover:text-[#a8840a] transition-colors"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>

      {/* ─── RIGHT: Image Panel ─── */}
      <div className="hidden lg:block lg:w-[54%] relative overflow-hidden bg-[#0f0e0b]">

        {/* Jewellery image */}
        <img
          src="/heroimages/2/THA_0673.jpg"
          alt="New Kalyani Jewellers"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-55"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0b] via-[#0f0e0b]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0b]/40 to-transparent" />

        {/* Top-left gold rule accent */}
        <div className="absolute top-10 left-10 flex items-center gap-3">
          <div className="w-6 h-px bg-[#C49B08]/60" />
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-[#C49B08]/70">
            New Kalyani Jewellers
          </p>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-14 left-12 right-12">
          <div className="w-8 h-px bg-[#C49B08]/60 mb-5" />
          <h2 className="font-display text-5xl xl:text-6xl font-light tracking-[0.2em] text-white leading-[1.1] mb-5">
            Timeless<br />Elegance
          </h2>
          <p className="font-inter text-sm text-white/40 tracking-wide leading-relaxed max-w-[280px]">
            Crafting cherished jewellery for over four decades — each piece a testament to devotion and mastery.
          </p>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49B08]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

      </div>

    </div>
  );
}
