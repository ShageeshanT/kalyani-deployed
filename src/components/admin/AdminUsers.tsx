"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, ShieldCheck, ShieldOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserEntry {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<UserEntry[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: string;
    }) => {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update role");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Role updated successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filtered = users?.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#C49B08]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-gray-900 tracking-wide">
            User Management
          </h2>
          <p className="font-inter text-xs text-gray-500 mt-1">
            {users?.length || 0} registered users
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-inter text-sm bg-white border-2 border-gray-300 rounded-lg focus:border-[#C49B08] focus:ring-2 focus:ring-[#C49B08]/30 text-gray-900 placeholder:text-gray-400 h-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left px-5 py-3 font-inter text-[11px] tracking-[0.1em] uppercase text-gray-500 font-semibold">
                  Email
                </th>
                <th className="text-left px-5 py-3 font-inter text-[11px] tracking-[0.1em] uppercase text-gray-500 font-semibold">
                  Role
                </th>
                <th className="text-left px-5 py-3 font-inter text-[11px] tracking-[0.1em] uppercase text-gray-500 font-semibold hidden sm:table-cell">
                  Joined
                </th>
                <th className="text-right px-5 py-3 font-inter text-[11px] tracking-[0.1em] uppercase text-gray-500 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-12 font-inter text-sm text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
              {filtered?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="font-inter text-sm text-gray-800">
                      {user.email}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {user.role === "admin" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#C49B08]/10 text-[#C49B08] border border-[#C49B08]/20">
                        <ShieldCheck className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-gray-100 text-gray-500 border border-gray-200">
                        Customer
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="font-inter text-xs text-gray-400">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        {user.role === "admin" ? (
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-inter font-medium text-red-600 hover:bg-red-50 transition-colors"
                            disabled={updateRole.isPending}
                          >
                            <ShieldOff className="h-3.5 w-3.5" />
                            Demote
                          </button>
                        ) : (
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-inter font-medium text-[#C49B08] hover:bg-[#C49B08]/10 transition-colors"
                            disabled={updateRole.isPending}
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Promote
                          </button>
                        )}
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white border border-gray-200 shadow-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-display text-xl text-gray-900">
                            {user.role === "admin"
                              ? "Demote to Customer?"
                              : "Promote to Admin?"}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="font-inter text-sm text-gray-600 leading-relaxed">
                            {user.role === "admin"
                              ? `This will remove admin access for `
                              : `This will grant admin access to `}
                            <span className="font-semibold text-gray-900">{user.email}</span>
                            {user.role === "admin"
                              ? `. They will no longer be able to access the admin dashboard.`
                              : `. They will be able to manage products, orders, and other admin features.`}
                            <br />
                            <br />
                            <span className="text-gray-500 text-xs">
                              The user will need to sign out and sign back in for changes to take effect.
                            </span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-2">
                          <AlertDialogCancel className="font-inter text-sm border-gray-300 text-gray-700 hover:bg-gray-100">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              updateRole.mutate({
                                userId: user.id,
                                role:
                                  user.role === "admin" ? "customer" : "admin",
                              })
                            }
                            className={
                              user.role === "admin"
                                ? "bg-red-600 hover:bg-red-700 text-white font-inter text-sm font-semibold"
                                : "bg-[#C49B08] hover:bg-[#a8850a] text-white font-inter text-sm font-semibold"
                            }
                          >
                            {user.role === "admin" ? "Demote" : "Promote to Admin"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
