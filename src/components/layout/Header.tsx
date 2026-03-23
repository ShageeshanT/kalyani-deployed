"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Search, User, LogOut, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";

const LiquidEther = dynamic(() => import("@/components/effects/LiquidEther"), { ssr: false });

const navigation = [
  { name: "New In", href: "/new" },
  { name: "Jewellery", href: "/collections" },
  { name: "Gems", href: "/gems" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAdmin, isSignedIn, user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/70 backdrop-blur-md" : "bg-white"
      )}
    >
      {/* LiquidEther effect overlay */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={["#a4a2a9", "#ffffff", "#a38e05"]}
          cursorSize={30}
          mouseForce={15}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
          autoResumeDelay={800}
        />
      </div>

      {/* Top bar */}
      <div className="bg-gold text-white py-[3px] md:py-[4px] text-center text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.4em] uppercase font-light relative z-10 px-2">
        <span className="inline-flex items-center gap-3 md:gap-5">
          {/* Left ornament */}
          <span className="inline-flex items-center gap-1.5" aria-hidden="true">
            <span className="block w-5 md:w-8 h-px bg-white/60" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0.5L7.2 4.8L11.5 6L7.2 7.2L6 11.5L4.8 7.2L0.5 6L4.8 4.8Z" fill="white" fillOpacity="0.9"/>
            </svg>
            <span className="block w-2 md:w-3 h-px bg-white/40" />
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </span>

          Crown Yourself

          {/* Right ornament */}
          <span className="inline-flex items-center gap-1.5" aria-hidden="true">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z" fill="white" fillOpacity="0.6"/>
            </svg>
            <span className="block w-2 md:w-3 h-px bg-white/40" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0.5L7.2 4.8L11.5 6L7.2 7.2L6 11.5L4.8 7.2L0.5 6L4.8 4.8Z" fill="white" fillOpacity="0.9"/>
            </svg>
            <span className="block w-5 md:w-8 h-px bg-white/60" />
          </span>
        </span>
      </div>

      {/* Single navbar row */}
      <nav className="px-3 sm:px-6 lg:px-10 relative z-10">
        <div className="flex items-center h-16 sm:h-20 relative">
          {/* Left: Mobile menu button + Desktop Navigation */}
          <div className="flex items-center gap-8 flex-1">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <Menu className="h-5 w-5 text-black" />
              )}
            </button>

            {/* Desktop Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hidden lg:block text-[13px] tracking-[0.2em] uppercase transition-all duration-300 relative group font-light text-black hover:text-gold"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-[0.5px] bg-gold transform scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Center: Logo + Brand Name (absolutely centered) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-10"
          >
            <Image
              src="/logo.png"
              alt="New Kalyani Jewellers"
              width={56}
              height={56}
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
            <h1 className="block text-[10px] sm:text-sm md:text-lg lg:text-xl font-display font-normal tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.15em] text-black whitespace-nowrap">
              NEW KALYANI JEWELLERS
            </h1>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5 flex-1 justify-end">
            {/* Auth section */}
            {isSignedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden md:block text-[12px] tracking-[0.2em] uppercase font-light text-black hover:text-gold transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {/* User avatar / dropdown - hidden on mobile, use hamburger menu instead */}
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors border border-gold/30"
                  >
                    <User className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                      {/* Thin gold accent line at top */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

                      {/* Email */}
                      <div className="px-4 py-3.5 border-b border-gray-100 bg-gray-50/80">
                        <p className="font-inter text-[11px] text-gray-400 truncate tracking-wide">
                          {user?.email}
                        </p>
                      </div>

                      {/* My Account */}
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 font-inter text-xs tracking-[0.08em] text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                      >
                        <Settings className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        My Account
                      </Link>

                      {/* Admin Dashboard */}
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 font-inter text-xs tracking-[0.08em] text-[#C49B08] hover:bg-[#C49B08]/6 transition-colors"
                        >
                          <span className="h-3.5 w-3.5 rounded-full bg-[#C49B08]/20 flex items-center justify-center text-[#C49B08] text-[8px] font-bold">A</span>
                          Admin Dashboard
                        </Link>
                      )}

                      {/* Sign Out */}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full px-4 py-3 font-inter text-xs tracking-[0.08em] text-gray-500 hover:text-red-500 hover:bg-red-50/60 transition-colors group"
                        >
                          <LogOut className="h-3.5 w-3.5 group-hover:text-red-400 transition-colors" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="hidden md:block text-[12px] tracking-[0.2em] uppercase font-light text-black hover:text-gold transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent h-8 w-8 md:h-9 md:w-9 text-black transition-colors duration-300 hover:text-gold"
              >
                <Heart className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </Button>
            </Link>

            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent h-8 w-8 md:h-9 md:w-9 text-black transition-colors duration-300 hover:text-gold"
              >
                <Search className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in bg-white">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-gray-800 hover:bg-gray-50 hover:text-[#C49B08] rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile auth links */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                {isSignedIn ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-[#C49B08] hover:bg-[#C49B08]/6 rounded-lg block transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-gray-700 hover:bg-gray-50 rounded-lg block transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-gray-500 hover:bg-red-50/60 hover:text-red-500 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-gray-700 hover:bg-gray-50 rounded-lg block transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 font-inter text-sm tracking-[0.15em] uppercase text-gray-700 hover:bg-gray-50 rounded-lg block transition-colors"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Gold line extending fully */}
      <div className="w-full h-[1px] bg-gold relative z-10" />
    </header>
  );
}
