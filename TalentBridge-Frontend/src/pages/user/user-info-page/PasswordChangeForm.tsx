import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SelfUserUpdatePasswordRequestDto } from "@/types/user.d.ts";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PasswordChangeFormProps {
  onSubmit: (data: SelfUserUpdatePasswordRequestDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface FormData extends SelfUserUpdatePasswordRequestDto {
  confirmPassword: string;
}

const PasswordChangeForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: PasswordChangeFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu mới không trùng");
      return;
    }

    const requestData: SelfUserUpdatePasswordRequestDto = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    onSubmit(requestData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Card className="mt-6 border-orange-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-800">
            <Lock className="h-5 w-5" />
            Đổi mật khẩu
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mx-auto grid max-w-md gap-6 md:grid-cols-1">
            {/* Current Password */}
            <div className="space-y-2">
              <Label
                htmlFor="oldPassword"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu hiện tại *
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={(e) =>
                    handleInputChange("oldPassword", e.target.value)
                  }
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu mới *
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  placeholder="Nhập mật khẩu mới"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu mới *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Nhập lại mật khẩu mới"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="mx-auto max-w-md rounded-lg border border-orange-200 bg-orange-50 p-4">
            <h4 className="mb-2 text-sm font-medium text-orange-800">
              Yêu cầu mật khẩu:
            </h4>
            <ul className="space-y-1 text-xs text-orange-700">
              <li>• Ít nhất 6 ký tự</li>
              <li>• Chứa ít nhất 1 chữ hoa (A-Z)</li>
              <li>• Chứa ít nhất 1 chữ thường (a-z)</li>
              <li>• Chứa ít nhất 1 số (0-9)</li>
              <li>• Khác với mật khẩu hiện tại</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mx-auto flex max-w-md gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Đổi mật khẩu
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
            >
              Hủy bỏ
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeForm;
