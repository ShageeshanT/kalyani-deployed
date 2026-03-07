"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={isHomePage ? "flex-1" : "flex-1 pt-[calc(2.5rem+4rem)]"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
