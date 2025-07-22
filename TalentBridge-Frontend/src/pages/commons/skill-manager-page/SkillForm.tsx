import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import type {
  DefaultSkillResponseDto,
  createSkillRequestDto,
  updateSkillRequestDto,
} from "@/types/skill.d.ts";
import { DialogDescription } from "@radix-ui/react-dialog";

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: createSkillRequestDto, id?: number) => void;
  initialData: DefaultSkillResponseDto | null;
  onCloseForm: () => void;
  theme?: "blue" | "purple";
}

export function SkillForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
  theme = "blue",
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
    setFormData({ name: "" });
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
              Tên kỹ năng <span className="text-red-500">*</span>
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
            <Button
              type="submit"
              className={`${theme === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"}`}
            >
              {initialData ? "Lưu thay đổi" : "Thêm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
