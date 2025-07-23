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
import type {
  DefaultCompanyResponseDto,
  CreateAndUpdateRequestDto,
} from "@/types/company.d.ts";
import { DialogDescription } from "@radix-ui/react-dialog";

interface CompanyFormProps {
  onSubmit: (formData: FormData, id?: number) => Promise<unknown>;
  initialData: DefaultCompanyResponseDto | null;
  onCloseForm?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRecruiter?: boolean;
  isLoading: boolean;
}

export function CompanyForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
  isRecruiter = false,
  isLoading,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // DATA PREPARATION
    const data = new FormData();
    data.append(
      "company",
      new Blob([JSON.stringify(formData)], { type: "application/json" }),
    );
    if (logoFile) {
      data.append("logoFile", logoFile);
    }

    // SUBMIT
    await onSubmit(data, initialData?.id);

    // HANDLE AFTER SUBMIT
    if (!isRecruiter) handleReset();
    onOpenChange(false);
    onCloseForm?.();
  };

  const handleChange = (
    field: keyof CreateAndUpdateRequestDto,
    value: string,
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
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Biểu mẫu thông tin công ty
          </DialogTitle>
          <DialogDescription className="text-center">
            {initialData ? "Chỉnh sửa công ty" : "Thêm công ty mới"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Tên công ty{" "}
              <span className="text-red-500">
                <span className="text-red-500">*</span>
              </span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Mô tả <span className="text-red-500">*</span>
            </Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => {
                handleChange("description", value);
              }}
              placeholder="Nhập mô tả công ty..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Địa chỉ <span className="text-red-500">*</span>
            </Label>
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
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {initialData ? "Lưu thay đổi" : "Thêm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
