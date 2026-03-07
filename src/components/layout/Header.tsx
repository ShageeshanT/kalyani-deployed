"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingBag, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LiquidEther from "@/components/effects/LiquidEther";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

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
  const { cartCount } = useCart();
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
          autoDemo={false}
        />
      </div>

      {/* Top bar */}
      <div className="bg-gold text-white py-1.5 md:py-2.5 text-center text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-light relative z-10 px-2">
        <span>Free Shipping Across Sri Lanka From LKR 50,000</span>
      </div>

      {/* Single navbar row */}
      <nav className="px-3 sm:px-6 lg:px-10 relative z-10">
        <div className="flex items-center h-14 sm:h-16 relative">
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
            <h1 className="hidden sm:block text-sm md:text-lg lg:text-xl font-display font-normal tracking-[0.1em] md:tracking-[0.15em] text-black whitespace-nowrap">
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

                {/* User avatar / dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors border border-gold/30"
                  >
                    <User className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-xs font-inter text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-inter font-light text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-inter font-light text-gold hover:bg-muted transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-inter font-light text-foreground hover:bg-muted transition-colors border-t border-border mt-1"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
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

            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent h-8 w-8 md:h-9 md:w-9 text-black transition-colors duration-300 hover:text-gold"
              >
                <Search className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent h-8 w-8 md:h-9 md:w-9 text-black transition-colors duration-300 hover:text-gold"
              >
                <ShoppingBag className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C49B08] text-white text-[10px] font-medium flex items-center justify-center leading-none">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm tracking-[0.15em] uppercase text-black hover:bg-muted rounded-md"
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile auth links */}
              <div className="border-t border-border mt-2 pt-2">
                {isSignedIn ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 text-sm tracking-[0.15em] uppercase text-gold hover:bg-muted rounded-md block"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-sm tracking-[0.15em] uppercase text-black hover:bg-muted rounded-md block"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm tracking-[0.15em] uppercase text-black hover:bg-muted rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-sm tracking-[0.15em] uppercase text-black hover:bg-muted rounded-md block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-sm tracking-[0.15em] uppercase text-black hover:bg-muted rounded-md block"
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
