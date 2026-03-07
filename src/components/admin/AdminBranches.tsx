import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Trash2, MapPin, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminBranches = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: branches, isLoading } = useQuery({
    queryKey: ["admin-branches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addBranch = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("branches").insert({
        name: formData.name,
        address: formData.address,
        city: formData.city,
        phone: formData.phone || null,
        email: formData.email || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-branches"] });
      toast({ title: "Branch added successfully" });
      setOpen(false);
      setFormData({ name: "", address: "", city: "", phone: "", email: "" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteBranch = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("branches").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-branches"] });
      toast({ title: "Branch removed successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Branches</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm gap-1.5">
              <Plus size={16} />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-gray-900 [&_input]:text-gray-900 [&_input]:bg-white [&_input]:placeholder:text-gray-400 [&_input]:border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900">Add New Branch</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addBranch.mutate();
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Branch Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Main Branch"
                  required
                  className="border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full address"
                  required
                  className="border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">City</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City name"
                  required
                  className="border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Phone (optional)</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Contact number"
                  className="border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Email (optional)</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Branch email"
                  className="border-gray-300 text-gray-900"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={addBranch.isPending}
              >
                {addBranch.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Branch
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branch List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {branches?.map((branch) => (
            <div key={branch.id} className="bg-white border border-gray-200 rounded-lg p-4 relative">
              {/* Delete button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900">Remove Branch</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                      Are you sure you want to remove "{branch.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteBranch.mutate(branch.id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Branch info */}
              <h3 className="text-base font-semibold text-gray-900 mb-3 pr-6">{branch.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{branch.address}, {branch.city}</span>
                </div>
                {branch.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                )}
                {branch.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="shrink-0" />
                    <span>{branch.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {(!branches || branches.length === 0) && (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm bg-white border border-gray-200 rounded-lg">
              No branches yet. Click "Add Branch" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBranches;
