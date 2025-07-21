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
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import type {
  DefaultUserResponseDto,
  UserCreateRequestDto,
  UserUpdateRequestDto,
  CompanyForUser,
  RoleForUser,
} from "@/types/user";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserCreateRequestDto | UserUpdateRequestDto) => void;
  initialData?: DefaultUserResponseDto | null;
  onCloseForm?: () => void;
  companies?: CompanyForUser[];
  roles?: RoleForUser[];
}

export function UserForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
  companies = [],
  roles = [],
}: UserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    address: "",
    gender: "OTHER" as "MALE" | "FEMALE" | "OTHER",
    companyId: "",
    roleId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        password: "",
        dob: initialData.dob ? initialData.dob.split("T")[0] : "",
        address: initialData.address,
        gender: initialData.gender ?? "OTHER",
        companyId: initialData.company ? initialData.company.id.toString() : "",
        roleId: initialData.role ? initialData.role.id.toString() : "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        dob: "",
        address: "",
        gender: "OTHER",
        companyId: "",
        roleId: "",
      });
    }
    setErrors({});
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    // Email validation (only for create mode)
    if (!isEditMode) {
      if (!formData.email.trim()) {
        newErrors.email = "Email không được để trống";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }
    }

    // Password validation (only for create mode)
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Mật khẩu không được để trống";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password =
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
      }
    }

    // Date of birth validation
    if (!formData.dob) {
      newErrors.dob = "Ngày sinh không được để trống";
    } else if (!validateDateOfBirth(formData.dob)) {
      newErrors.dob = "Ngày sinh không hợp lệ";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    // Company validation
    if (!formData.companyId) {
      newErrors.companyId = "Vui lòng chọn công ty";
    }

    // Role validation
    if (!formData.roleId) {
      newErrors.roleId = "Vui lòng chọn vai trò";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode) {
      // Update mode - use UserUpdateRequestDto
      const updateData: UserUpdateRequestDto = {
        id: initialData!.id.toString(),
        name: formData.name,
        gender: formData.gender,
        dob: new Date(formData.dob).toISOString(),
        address: formData.address,
        company: { id: Number.parseInt(formData.companyId) },
        role: { id: Number.parseInt(formData.roleId) },
      };
      onSubmit(updateData);
    } else {
      // Create mode - use UserCreateRequestDto
      const createData: UserCreateRequestDto = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: new Date(formData.dob).toISOString(),
        address: formData.address,
        gender: formData.gender,
        company: { id: Number.parseInt(formData.companyId) },
        role: { id: Number.parseInt(formData.roleId) },
      };
      onSubmit(createData);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      dob: "",
      address: "",
      gender: "OTHER",
      companyId: "",
      roleId: "",
    });
    setErrors({});
    onOpenChange(false);
    onCloseForm?.();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateDateOfBirth = (dob: string): boolean => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 120,
      today.getMonth(),
      today.getDate(),
    );
    return birthDate <= today && birthDate >= minDate;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-blue-800">
            {isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {isEditMode
              ? "Cập nhật thông tin người dùng"
              : "Tạo tài khoản người dùng mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`border-gray-300 focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Email (only for create mode) */}
            {!isEditMode && (
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-gray-300 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>
            )}

            {/* Password (only for create mode) */}
            {!isEditMode && (
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`border-gray-300 pr-10 focus:border-blue-500 ${errors.password ? "border-red-500" : ""}`}
                    placeholder="Nhập mật khẩu"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
            )}

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Ngày sinh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                className={`border-gray-300 focus:border-blue-500 ${errors.dob ? "border-red-500" : ""}`}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.dob && (
                <span className="text-xs text-red-500">{errors.dob}</span>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Giới tính <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value: "MALE" | "FEMALE" | "OTHER") =>
                  handleInputChange("gender", value)
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
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

          {/* Address */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Địa chỉ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`border-gray-300 focus:border-blue-500 ${errors.address ? "border-red-500" : ""}`}
              placeholder="Số nhà, đường, phường, quận, thành phố"
            />
            {errors.address && (
              <span className="text-xs text-red-500">{errors.address}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {isEditMode ? "Cập nhật" : "Tạo người dùng"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
