"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Package, LogOut, Settings, Loader2, Eye, EyeOff } from "lucide-react";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pwForm, setPwForm] = useState({ newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [showPw, setShowPw] = useState({ newPassword: false, confirmPassword: false });
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    } else if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone, address, city")
        .eq("id", user!.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user!.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleSignOutAll = async () => {
    try {
      await supabase.auth.signOut({ scope: "global" });
      router.push("/");
    } catch {
      toast({ title: "Error", description: "Failed to sign out of all devices.", variant: "destructive" });
    }
  };

  const handlePasswordChange = async () => {
    if (!pwForm.newPassword || pwForm.newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setPwLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPassword });
      if (error) throw error;
      toast({ title: "Password updated successfully" });
      setPwForm({ newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setPwLoading(false);
    }
  };

  /* ─── Loading ─── */
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="h-6 w-6 animate-spin text-[#C49B08]" />
        </div>
      </Layout>
    );
  }

  /* ─── User initial for avatar ─── */
  const initials = (profile.full_name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  /* ─── Page ─── */
  return (
    <Layout>
      {/* Gold accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

      <div className="min-h-screen bg-[#fafaf9] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ─── Hero header ─── */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-[0.15em] text-gray-900">
              My Account
            </h1>
            <div className="w-8 h-px bg-[#C49B08]/50 mx-auto mt-3 mb-1" />
            <p className="font-inter text-xs text-gray-400 tracking-wide mt-2">
              {user?.email}
            </p>
          </div>

          {/* ─── Tabs ─── */}
          <Tabs defaultValue="profile" className="w-full">
            <div className="overflow-x-auto mb-6">
              <TabsList className="bg-white border border-gray-200 rounded-xl p-1 grid grid-cols-3 min-w-[260px] w-full shadow-sm">
                <TabsTrigger
                  value="profile"
                  className="font-inter font-medium text-xs sm:text-sm text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg gap-1.5 transition-all"
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="font-inter font-medium text-xs sm:text-sm text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg gap-1.5 transition-all"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="font-inter font-medium text-xs sm:text-sm text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg gap-1.5 transition-all"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* ─── Profile tab ─── */}
            <TabsContent value="profile">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                {/* Section heading */}
                <div className="mb-7">
                  <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-[#C49B08] mb-1">Your Details</p>
                  <h2 className="font-display text-xl font-light tracking-wide text-gray-900">Personal Information</h2>
                  <div className="w-6 h-px bg-[#C49B08]/40 mt-2" />
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block">
                        Full Name
                      </label>
                      <input
                        value={profile.full_name || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, full_name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full h-11 px-4 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors rounded-md"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number"
                        className="w-full h-11 px-4 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors rounded-md"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block">
                      Address
                    </label>
                    <input
                      value={profile.address || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Your street address"
                      className="w-full h-11 px-4 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors rounded-md"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-600 block">
                      City
                    </label>
                    <input
                      value={profile.city || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="Your city"
                      className="w-full h-11 px-4 border border-gray-300 focus:border-[#C49B08] focus:outline-none font-inter text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 px-8 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </TabsContent>

            {/* ─── Orders tab ─── */}
            <TabsContent value="orders">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="mb-7">
                  <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-[#C49B08] mb-1">History</p>
                  <h2 className="font-display text-xl font-light tracking-wide text-gray-900">Order History</h2>
                  <div className="w-6 h-px bg-[#C49B08]/40 mt-2" />
                </div>
                <div className="text-center py-14">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C49B08]/8 border border-[#C49B08]/20 mb-4">
                    <Package className="h-6 w-6 text-[#C49B08]/60" />
                  </div>
                  <p className="font-inter text-sm text-gray-400 tracking-wide">No orders yet</p>
                  <p className="font-inter text-xs text-gray-300 mt-1">Your purchases will appear here</p>
                </div>
              </div>
            </TabsContent>

            {/* ─── Settings tab ─── */}
            <TabsContent value="settings">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="mb-7">
                  <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-[#C49B08] mb-1">Preferences</p>
                  <h2 className="font-display text-xl font-light tracking-wide text-gray-900">Account Settings</h2>
                  <div className="w-6 h-px bg-[#C49B08]/40 mt-2" />
                </div>

                <div className="space-y-6">
                  {/* Email row */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-0.5">Email Address</p>
                      <p className="font-inter text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-inter font-medium border border-green-200">
                      Verified
                    </span>
                  </div>

                  {/* Change password */}
                  <div className="py-4 border-b border-gray-100">
                    <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-4">Change Password</p>
                    <div className="space-y-3 max-w-sm">
                      <div>
                        <label className="font-inter text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1.5 block">New Password</label>
                        <div className="relative">
                          <input
                            type={showPw.newPassword ? "text" : "password"}
                            value={pwForm.newPassword}
                            onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                            placeholder="Min. 6 characters"
                            className="w-full h-10 px-3 pr-10 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 placeholder-gray-400 focus:border-[#C49B08] focus:outline-none transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPw(s => ({ ...s, newPassword: !s.newPassword }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C49B08] transition-colors"
                            tabIndex={-1}
                          >
                            {showPw.newPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="font-inter text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1.5 block">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showPw.confirmPassword ? "text" : "password"}
                            value={pwForm.confirmPassword}
                            onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))}
                            placeholder="Repeat new password"
                            className="w-full h-10 px-3 pr-10 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 placeholder-gray-400 focus:border-[#C49B08] focus:outline-none transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPw(s => ({ ...s, confirmPassword: !s.confirmPassword }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C49B08] transition-colors"
                            tabIndex={-1}
                          >
                            {showPw.confirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handlePasswordChange}
                        disabled={pwLoading}
                        className="h-10 px-6 bg-[#C49B08] hover:bg-[#a8840a] disabled:opacity-60 text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2"
                      >
                        {pwLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Sign out */}
                  <div className="pt-2">
                    <p className="font-inter text-xs text-gray-400 mb-3">Manage your active sessions.</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleSignOut}
                        className="h-10 px-6 bg-gray-900 hover:bg-red-600 text-white font-inter text-[11px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                      <button
                        onClick={handleSignOutAll}
                        className="h-10 px-6 border border-gray-300 hover:border-red-500 hover:text-red-600 text-gray-600 font-inter text-[11px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out All Devices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
