import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Save, User } from "lucide-react";
import type { UserDetailsResponseDto } from "@/types/user.types.ts";

interface ProfileEditFormProps {
  userDetails: UserDetailsResponseDto;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ProfileFormData {
  name: string;
  email: string;
  age: number;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

const ProfileEditForm = ({
  userDetails,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: userDetails.name,
    email: userDetails.email,
    age: userDetails.age,
    address: userDetails.address,
    gender: userDetails.gender,
  });

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Tuổi phải từ 1 đến 120";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof ProfileFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="mt-6 border-orange-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-800">
            <User className="h-5 w-5" />
            Cập nhật thông tin cá nhân
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Họ và tên *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <Label
                htmlFor="age"
                className="text-sm font-medium text-gray-700"
              >
                Tuổi *
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", Number.parseInt(e.target.value) || 0)
                }
                className={`${errors.age ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"}`}
                placeholder="Nhập tuổi"
              />
              {errors.age && (
                <p className="text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700"
              >
                Giới tính *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value: "MALE" | "FEMALE" | "OTHER") =>
                  handleInputChange("gender", value)
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-orange-500">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Nam</SelectItem>
                  <SelectItem value="FEMALE">Nữ</SelectItem>
                  <SelectItem value="OTHER">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Địa chỉ *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-orange-500"} min-h-[80px]`}
              placeholder="Nhập địa chỉ đầy đủ"
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
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
                  <Save className="mr-2 h-4 w-4" />
                  Cập nhật thông tin
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

export default ProfileEditForm;
