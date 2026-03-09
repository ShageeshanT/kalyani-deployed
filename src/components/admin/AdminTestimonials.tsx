"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Check, X, Trash2, Star, Loader2, MessageSquare } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  district: string | null;
  email: string | null;
  rating: number;
  message: string;
  status: "pending" | "approved" | "declined";
  created_at: string;
};

type FilterStatus = "all" | "pending" | "approved" | "declined";

export default function AdminTestimonials() {
  const [filter, setFilter] = useState<FilterStatus>("pending");
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "declined";
    }) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["approved-testimonials"] });
    },
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["approved-testimonials"] });
    },
  });

  const filtered = testimonials?.filter(
    (t) => filter === "all" || t.status === filter
  );

  const counts = {
    all: testimonials?.length ?? 0,
    pending: testimonials?.filter((t) => t.status === "pending").length ?? 0,
    approved: testimonials?.filter((t) => t.status === "approved").length ?? 0,
    declined: testimonials?.filter((t) => t.status === "declined").length ?? 0,
  };

  const filterButtons: {
    key: FilterStatus;
    label: string;
    active: string;
    inactive: string;
  }[] = [
    {
      key: "all",
      label: "All",
      active: "bg-[#C49B08] text-white shadow-sm",
      inactive: "bg-white border border-gray-200 text-gray-600 hover:border-gray-300",
    },
    {
      key: "pending",
      label: "Pending",
      active: "bg-yellow-100 text-yellow-800 border border-yellow-300 shadow-sm",
      inactive: "bg-white border border-gray-200 text-gray-600 hover:border-yellow-200",
    },
    {
      key: "approved",
      label: "Approved",
      active: "bg-green-100 text-green-800 border border-green-300 shadow-sm",
      inactive: "bg-white border border-gray-200 text-gray-600 hover:border-green-200",
    },
    {
      key: "declined",
      label: "Declined",
      active: "bg-red-100 text-red-800 border border-red-300 shadow-sm",
      inactive: "bg-white border border-gray-200 text-gray-600 hover:border-red-200",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#C49B08]" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-inter text-xl font-bold text-gray-900 tracking-tight">Testimonials</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and approve customer testimonials for the About page
          </p>
        </div>
        {counts.pending > 0 && (
          <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
            {counts.pending} pending review
          </span>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterButtons.map(({ key, label, active, inactive }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === key ? active : inactive
            }`}
          >
            {label}
            <span className="ml-1.5 opacity-70">({counts[key]})</span>
          </button>
        ))}
      </div>

      {/* Testimonials list */}
      {!filtered || filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <MessageSquare className="h-8 w-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-400">
            No {filter === "all" ? "" : filter} testimonials yet
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Top row: name, email, stars, status badge */}
                  <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                    <span className="font-inter text-sm font-semibold text-gray-900">
                      {t.name}
                    </span>
                    {t.district && (
                      <span className="font-inter text-xs text-[#C49B08] font-medium">
                        {t.district}
                      </span>
                    )}
                    {t.email && (
                      <span className="font-inter text-xs text-gray-400">
                        {t.email}
                      </span>
                    )}
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= t.rating
                              ? "fill-[#C49B08] text-[#C49B08]"
                              : "fill-gray-100 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Status badge */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : t.status === "declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  {/* Date */}
                  <p className="font-inter text-xs text-gray-400 mt-2">
                    Submitted{" "}
                    {new Date(t.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  {t.status !== "approved" && (
                    <button
                      onClick={() =>
                        updateStatus.mutate({ id: t.id, status: "approved" })
                      }
                      disabled={updateStatus.isPending}
                      title="Approve"
                      className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors disabled:opacity-50"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  {t.status !== "declined" && (
                    <button
                      onClick={() =>
                        updateStatus.mutate({ id: t.id, status: "declined" })
                      }
                      disabled={updateStatus.isPending}
                      title="Decline"
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTestimonial.mutate(t.id)}
                    disabled={deleteTestimonial.isPending}
                    title="Delete permanently"
                    className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
