"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

// /auth now just redirects to Clerk's hosted sign-in/sign-up pages.
const Auth = () => {
  const router = useRouter();
  const { loading, isSignedIn } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isSignedIn) {
        router.replace("/");
      } else {
        router.replace("/sign-in");
      }
    }
  }, [loading, isSignedIn, router]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </Layout>
  );
};

export default Auth;
