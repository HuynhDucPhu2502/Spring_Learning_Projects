import type React from "react";

import { useEffect, useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { UserCreateRequestDto, UserUpdateRequestDto } from "@/types/user";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { getUserById, saveUser, updateUser } from "@/services/userApi";
import type { CompanySummary } from "@/types/job";
import CompanySelection from "@/pages/commons/CompanySelection.tsx";
import type { RoleSummary } from "@/types/role.js";
import RoleSelection from "@/pages/commons/RoleSelection.tsx";
import { useAppSelector } from "@/features/hooks.ts";

export default function UserUpsertPage() {
  const { permissions } = useAppSelector((state) => state.auth.user);

  // ============================
  // Checking is edit or create
  // ============================
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  // ============================
  // Form data
  // ============================
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
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<
    CompanySummary | undefined
  >();
  const [selectedRole, setSelectedRole] = useState<RoleSummary | undefined>();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await getUserById(parseInt(id));
          const user = res.data.data;
          setFormData({
            name: user.name,
            email: user.email,
            password: "",
            dob: user.dob ? user.dob.split("T")[0] : "",
            address: user.address ? user.address : "",
            gender: user?.gender,
            companyId: user.company?.id.toString(),
            roleId: user.role?.id.toString(),
          });

          setSelectedCompany(user.company);
          setSelectedRole(user.role);
        } catch (err) {
          toast.error(getErrorMessage(err, "Không tìm thấy người dùng này"));
          setSearchParams({});
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, setSearchParams]);

  // ============================
  // Company selection handler
  // ============================
  const addCompany = (company: CompanySummary) => {
    const newCompany = selectedCompany?.id === company.id ? undefined : company;
    setSelectedCompany(newCompany);

    const companyId = newCompany?.id;

    setFormData((prev) => ({
      ...prev,
      companyId: companyId ? companyId.toString() : "",
    }));
  };

  const removeCompany = () => {
    setSelectedCompany(undefined);
    setFormData((prev) => ({ ...prev, companyId: "" }));
  };

  // ============================
  // Company selection handler
  // ============================
  const addRole = (role: RoleSummary) => {
    const newRole = selectedRole?.id === role.id ? undefined : role;
    setSelectedRole(newRole);

    const roleId = newRole?.id;

    setFormData((prev) => ({
      ...prev,
      roleId: roleId ? roleId.toString() : "",
    }));
  };

  const removeRole = () => {
    setSelectedRole(undefined);
    setFormData((prev) => ({ ...prev, roleId: "" }));
  };

  // ============================
  // Form Submit Handler
  // ============================
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const company = selectedCompany?.id ? selectedCompany : null;
      const role = selectedRole?.id ? selectedRole : null;

      if (isEdit) {
        const updateData: UserUpdateRequestDto = {
          id: id!,
          name: formData.name,
          gender: formData.gender,
          dob: new Date(formData.dob).toISOString(),
          address: formData.address,
          company: company ?? { id: -1 },
          role: role ?? { id: -1 },
        };
        await updateUser(updateData);
      } else {
        const createData: UserCreateRequestDto = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          dob: new Date(formData.dob).toISOString(),
          address: formData.address,
          gender: formData.gender,
          company: company,
          role: role,
        };
        await saveUser(createData);
      }

      toast.success(
        isEdit ? "Cập nhật người dùng thành công" : "Tạo người dùng thành công",
      );
      handleBack();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          isEdit ? "Cập nhật người dùng thất bại" : "Tạo người dùng thất bại",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // General Field Handler
  // ============================
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ============================
  // Utils Handler
  // ============================
  const handleBack = () => {
    navigate("/admin/user-manager");
  };

  useEffect(() => {
    if (isEdit && !permissions.includes("PUT /users"))
      navigate("/admin/user-manager");
    else if (!isEdit && !permissions.includes("POST /users"))
      navigate("/admin/user-manager");
  }, [isEdit, navigate, permissions]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleBack} className="cursor-pointer">
              Quản lý người dùng
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEdit ? "Cập nhật" : "Tạo mới"} người dùng
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? "Cập nhật thông tin người dùng"
              : "Tạo tài khoản người dùng mới trong hệ thống"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Row 1 - Basic Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nhập họ và tên..."
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name}</span>
                )}
              </div>

              {/* Email (only for create mode) */}
              {!isEdit && (
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    required
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </div>
              )}
            </div>

            {/* Row 2 - Password and DOB */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Password (only for create mode) */}
              {!isEdit && (
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu..."
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                      required
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

              <div className="space-y-2">
                <Label htmlFor="dob">
                  Ngày sinh <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className={`w-fit ${errors.dob ? "border-red-500" : ""}`}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                {errors.dob && (
                  <span className="text-xs text-red-500">{errors.dob}</span>
                )}
              </div>
            </div>

            {/* Row 3 - Address and Gender */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="address">
                  Địa chỉ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="Số nhà, đường, phường, quận, thành phố..."
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                  required
                />
                {errors.address && (
                  <span className="text-xs text-red-500">{errors.address}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Giới tính <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: "MALE" | "FEMALE" | "OTHER") =>
                    handleInputChange("gender", value)
                  }
                >
                  <SelectTrigger>
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
          </form>
        </CardContent>
      </Card>

      {/* Company and Role Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Company Selection */}
        <CompanySelection
          selectedCompany={selectedCompany}
          addCompany={addCompany}
          removeCompany={removeCompany}
        />

        {/* Role Selection */}
        <RoleSelection
          selectedRole={selectedRole}
          addRole={addRole}
          removeRole={removeRole}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          Hủy
        </Button>
        <Button
          type="button"
          onClick={handleFormSubmit}
          disabled={isLoading}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {isLoading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Tạo người dùng"}
        </Button>
      </div>
    </div>
  );
}
