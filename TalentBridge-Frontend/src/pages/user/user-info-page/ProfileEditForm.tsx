import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  SelfUserUpdateProfileRequestDto,
  UserDetailsResponseDto,
} from "@/types/user.d.ts";
import { Save, User, X } from "lucide-react";
import { useState } from "react";

interface ProfileEditFormProps {
  userDetails: UserDetailsResponseDto;
  onSubmit: (data: SelfUserUpdateProfileRequestDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProfileEditForm = ({
  userDetails,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState<SelfUserUpdateProfileRequestDto>({
    name: userDetails.name,
    dob: userDetails.dob ? userDetails.dob.split("T")[0] : "",
    address: userDetails.address,
    gender: userDetails.gender,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      dob: new Date(formData.dob).toISOString(),
    };
    onSubmit(submitData);
  };

  const handleInputChange = (
    field: keyof SelfUserUpdateProfileRequestDto,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Date of Birth Field */}
            <div className="space-y-2">
              <Label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Ngày sinh *
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                required
              />
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
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Nhập địa chỉ đầy đủ"
              />
            </div>
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
