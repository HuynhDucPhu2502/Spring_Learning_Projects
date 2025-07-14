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
import { DialogDescription } from "@radix-ui/react-dialog";
import type {
  DefaultRoleRequestDto,
  DefaultRoleResponseDto,
} from "@/types/role.types.ts";

interface RoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DefaultRoleRequestDto, id?: number) => void;
  initialData: DefaultRoleResponseDto | null;
  onCloseForm: () => void;
}

export function RoleForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
}: RoleFormProps) {
  const [formData, setFormData] = useState<DefaultRoleRequestDto>({
    name: "",
    description: "",
    active: true,
    permissions: [],
  });

  useEffect(() => {
    if (initialData)
      setFormData({
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
        permissions: initialData.permissions.map((permission) => ({
          id: permission.id,
        })),
      });
    else
      setFormData({
        name: "",
        description: "",
        active: true,
        permissions: [],
      });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData, initialData?.id);
    setFormData({
      name: "",
      description: "",
      active: true,
      permissions: [],
    });
    onOpenChange(false);
    onCloseForm?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Biểu mẫu thông tin kỹ năng
          </DialogTitle>
          <DialogDescription className="text-center">
            {initialData ? "Chỉnh sửa kỹ năng" : "Thêm kỹ năng mới"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Tên chức vụ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
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
