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
import type {
  Skill,
  createSkillRequestDto,
  updateSkillRequestDto,
} from "@/types/skill";

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: createSkillRequestDto, id?: number) => void;
  initialData: Skill | null;
  onCloseForm: () => void;
}

export function SkillForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
}: SkillFormProps) {
  const [formData, setFormData] = useState<
    createSkillRequestDto | updateSkillRequestDto
  >({ name: "" });

  useEffect(() => {
    if (initialData)
      setFormData({ name: initialData.name, id: initialData.id });
    else setFormData({ name: "" });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
    onOpenChange(false);
    onCloseForm?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Chỉnh sửa kỹ năng" : "Thêm kỹ năng mới"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên kỹ năng *</Label>
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
