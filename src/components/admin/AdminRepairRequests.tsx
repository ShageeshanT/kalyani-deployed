"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { format } from "date-fns";

const repairStatuses = [
  "pending",
  "in_review",
  "in_progress",
  "completed",
  "cancelled",
] as const;
type RepairStatus = (typeof repairStatuses)[number];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-blue-100 text-blue-800",
  in_progress: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  in_review: "In Review",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const AdminRepairRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["admin-repair-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("repair_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: RepairStatus }) => {
      const { error } = await supabase
        .from("repair_requests")
        .update({ status } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-repair-requests"] });
      toast({ title: "Status updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteTicket = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("repair_requests")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-repair-requests"] });
      toast({ title: "Ticket deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Service Tickets</h2>
        <span className="text-sm text-gray-500">
          {tickets?.length ?? 0} ticket{tickets?.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Customer</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Phone</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Item</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(tickets as any[])?.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {/* Date */}
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {format(new Date(ticket.created_at), "dd MMM yyyy")}
                    </td>

                    {/* Customer name */}
                    <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                      {ticket.name}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {ticket.phone}
                    </td>

                    {/* Item */}
                    <td className="px-4 py-3 text-gray-700 max-w-[180px]">
                      <p className="truncate" title={ticket.item_description}>
                        {ticket.item_description}
                      </p>
                    </td>

                    {/* Status dropdown */}
                    <td className="px-4 py-3">
                      <Select
                        value={ticket.status ?? "pending"}
                        onValueChange={(value) =>
                          updateStatus.mutate({ id: ticket.id, status: value as RepairStatus })
                        }
                      >
                        <SelectTrigger
                          className={`w-32 text-xs border-0 rounded-full font-medium ${
                            statusColors[ticket.status ?? "pending"] ?? "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {repairStatuses.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="text-gray-900 text-sm data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
                            >
                              {statusLabels[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {/* View details */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-gray-300 text-gray-600 hover:text-gray-900"
                            >
                              <Eye size={14} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg bg-white">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-gray-900">
                                Service Ticket Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 text-sm">
                              <div className="grid grid-cols-[5rem_1fr] gap-y-2">
                                <span className="font-medium text-gray-600">Customer</span>
                                <span className="text-gray-900">{ticket.name}</span>

                                <span className="font-medium text-gray-600">Phone</span>
                                <span className="text-gray-900">{ticket.phone}</span>

                                <span className="font-medium text-gray-600">Status</span>
                                <span
                                  className={`inline-flex w-fit px-2 py-0.5 rounded-full text-xs font-medium ${
                                    statusColors[ticket.status ?? "pending"]
                                  }`}
                                >
                                  {statusLabels[ticket.status ?? "pending"]}
                                </span>
                              </div>

                              <div className="border-t border-gray-100 pt-3 space-y-2">
                                <p className="font-medium text-gray-600">Item</p>
                                <p className="text-gray-800 bg-gray-50 rounded p-2">
                                  {ticket.item_description}
                                </p>
                              </div>

                              <div className="border-t border-gray-100 pt-3 space-y-2">
                                <p className="font-medium text-gray-600">Issue Description</p>
                                <p className="text-gray-800 bg-gray-50 rounded p-2 whitespace-pre-wrap">
                                  {ticket.issue_description}
                                </p>
                              </div>

                              {ticket.admin_notes && (
                                <div className="border-t border-gray-100 pt-3 space-y-2">
                                  <p className="font-medium text-gray-600">Admin Notes</p>
                                  <p className="text-gray-800 bg-gray-50 rounded p-2">
                                    {ticket.admin_notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-gray-900">Delete Ticket</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600">
                                Are you sure you want to delete this service ticket? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-gray-700">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTicket.mutate(ticket.id)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!tickets || tickets.length === 0) && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No service tickets yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRepairRequests;
