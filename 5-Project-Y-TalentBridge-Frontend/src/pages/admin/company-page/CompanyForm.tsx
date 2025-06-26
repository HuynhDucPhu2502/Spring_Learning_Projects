import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/custom/RichText/index-editor";
import type { Company, CreateAndUpdateRequestDto } from "@/types/company";

interface CompanyFormProps {
  onSubmit: (formData: FormData, id?: number) => void;
  initialData: Company | null;
  onCloseForm: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompanyForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
}: CompanyFormProps) {
  const [formData, setFormData] = useState<CreateAndUpdateRequestDto>({
    name: "",
    description: "",
    address: "",
  });
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        address: initialData.address,
      });
      setLogoPreview(initialData.logoUrl || "");
    } else {
      setFormData({ name: "", description: "", address: "" });
      setLogoPreview("");
    }
    setLogoFile(null);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append(
      "company",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (logoFile) {
      data.append("logoFile", logoFile);
    }
    onSubmit(data, initialData?.id);
    handleReset();
    onOpenChange(false);
    onCloseForm?.();
  };

  const handleChange = (
    field: keyof CreateAndUpdateRequestDto,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", description: "", address: "" });
    setLogoPreview("");
    setLogoFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Chỉnh sửa công ty" : "Thêm công ty mới"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên công ty *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả *</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Nhập mô tả công ty..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleChangeLogo}
            />
            {logoPreview && (
              <div className="mt-2">
                <img
                  src={logoPreview}
                  alt="Xem trước logo"
                  className="h-16 rounded border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {initialData ? "Lưu thay đổi" : "Thêm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
