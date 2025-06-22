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
  onSubmit: (data: CreateAndUpdateRequestDto, id?: number) => void;
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
    logo: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        name: "",
        description: "",
        address: "",
        logo: "",
      });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
    onOpenChange(false);
    onCloseForm?.();
  };

  const handleChange = (
    field: keyof CreateAndUpdateRequestDto,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              type="url"
              value={formData.logo}
              onChange={(e) => handleChange("logo", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
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
