import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Upload, X, Trash2 } from "lucide-react";
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

const GEM_TYPES = [
  { value: "blue_sapphire", label: "Blue Sapphire" },
  { value: "ruby", label: "Ruby" },
  { value: "emerald", label: "Emerald" },
  { value: "diamond", label: "Diamond" },
  { value: "yellow_sapphire", label: "Yellow Sapphire" },
  { value: "cats_eye", label: "Cat's Eye" },
  { value: "pink_sapphire", label: "Pink Sapphire" },
  { value: "alexandrite", label: "Alexandrite" },
  { value: "spinel", label: "Spinel" },
  { value: "other", label: "Other" },
] as const;

const CUT_OPTIONS = ["Oval", "Round", "Heart", "Pear", "Cushion", "Emerald Cut", "Princess", "Marquise", "Other"];
const ORIGIN_OPTIONS = ["Sri Lanka", "Burma", "Colombia", "Madagascar", "Mozambique", "Thailand", "Brazil", "Other"];

const emptyForm = {
  name: "",
  gem_type: "",
  color: "",
  origin: "",
  carat_weight: "",
  cut: "",
  clarity: "",
  treatment: "",
  description: "",
  price_lkr: "",
  is_available: true,
  is_featured: false,
};

const AdminGems = () => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: gems, isLoading } = useQuery({
    queryKey: ["admin-gems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gems")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const filePath = `gem-images/${fileName}`;

    const { error } = await supabase.storage.from("gems").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    const { data: urlData } = supabase.storage.from("gems").getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const addGem = useMutation({
    mutationFn: async () => {
      setUploading(true);
      let imageUrl: string | null = null;
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const { error } = await supabase.from("gems").insert({
        name: formData.name,
        gem_type: formData.gem_type,
        color: formData.color || null,
        origin: formData.origin || null,
        carat_weight: formData.carat_weight ? parseFloat(formData.carat_weight) : null,
        cut: formData.cut || null,
        clarity: formData.clarity || null,
        treatment: formData.treatment || null,
        description: formData.description || null,
        price_lkr: formData.price_lkr ? parseFloat(formData.price_lkr) : null,
        is_available: formData.is_available,
        is_featured: formData.is_featured,
        images: imageUrl ? [imageUrl] : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gems"] });
      queryClient.invalidateQueries({ queryKey: ["gems-public"] });
      toast({ title: "Gem added successfully" });
      setOpen(false);
      setUploading(false);
      setImageFile(null);
      setImagePreview(null);
      setFormData(emptyForm);
    },
    onError: (error: any) => {
      setUploading(false);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteGem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gems").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gems"] });
      queryClient.invalidateQueries({ queryKey: ["gems-public"] });
      toast({ title: "Gem deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const set = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Gems</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm gap-1.5">
              <Plus size={16} />
              Add Gem
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 [&_input]:text-gray-900 [&_input]:bg-white [&_input]:border-gray-300 [&_input]:placeholder:text-gray-400 [&_textarea]:text-gray-900 [&_textarea]:bg-white [&_textarea]:border-gray-300 [&_select]:text-gray-900 [&_select]:bg-white [&_select]:border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900">Add New Gem</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => { e.preventDefault(); addGem.mutate(); }}
              className="space-y-4"
            >
              {/* Image upload */}
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Gem Image</Label>
                {imagePreview ? (
                  <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* Name + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Name *</Label>
                  <Input value={formData.name} onChange={set("name")} required placeholder="e.g. Ceylon Blue Sapphire" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Gem Type *</Label>
                  <select
                    value={formData.gem_type}
                    onChange={set("gem_type")}
                    required
                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select type</option>
                    {GEM_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color + Origin */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Color</Label>
                  <Input value={formData.color} onChange={set("color")} placeholder="e.g. Cornflower Blue" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Origin</Label>
                  <select
                    value={formData.origin}
                    onChange={set("origin")}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select origin</option>
                    {ORIGIN_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Carat + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Carat Weight</Label>
                  <Input type="number" step="0.01" value={formData.carat_weight} onChange={set("carat_weight")} placeholder="0.00 ct" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Price (LKR)</Label>
                  <Input type="number" value={formData.price_lkr} onChange={set("price_lkr")} placeholder="0" />
                </div>
              </div>

              {/* Cut + Clarity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Cut / Shape</Label>
                  <select
                    value={formData.cut}
                    onChange={set("cut")}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select cut</option>
                    {CUT_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-700">Clarity</Label>
                  <Input value={formData.clarity} onChange={set("clarity")} placeholder="e.g. Eye Clean, VVS" />
                </div>
              </div>

              {/* Treatment */}
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Treatment</Label>
                <Input value={formData.treatment} onChange={set("treatment")} placeholder="e.g. No Heat, Unheated" />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-700">Description</Label>
                <Textarea value={formData.description} onChange={set("description")} rows={3} placeholder="Describe this gem..." />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData((p) => ({ ...p, is_available: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData((p) => ({ ...p, is_featured: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={addGem.isPending || uploading}
              >
                {(addGem.isPending || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {uploading ? "Uploading image..." : "Add Gem"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gems table */}
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
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Image</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Origin</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Carat</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Price</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gems?.map((gem: any) => (
                  <tr key={gem.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {gem.images?.[0] ? (
                        <img
                          src={gem.images[0]}
                          alt={gem.name}
                          className="w-10 h-10 object-cover rounded border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-[9px]">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{gem.name}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {GEM_TYPES.find((t) => t.value === gem.gem_type)?.label ?? gem.gem_type}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{gem.origin ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {gem.carat_weight ? `${gem.carat_weight} ct` : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {gem.price_lkr ? `LKR ${Number(gem.price_lkr).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          gem.is_available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {gem.is_available ? "Available" : "Sold"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded">
                            <Trash2 size={15} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-900">Delete Gem</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              Are you sure you want to delete "{gem.name}"? This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-gray-700">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteGem.mutate(gem.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!gems || gems.length === 0) && (
              <div className="text-center py-12 text-gray-400 text-sm">
                No gems yet. Click "Add Gem" to get started.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGems;
