import type React from "react";

import { useEffect, useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type {
  DefaultRoleRequestDto,
  DefaultRoleResponseDto,
} from "@/types/role";
import type { DefaultPermissionResponseDto } from "@/types/permission";
import { getMethodColor } from "@/utils/tagColorMapper";

interface RoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DefaultRoleRequestDto, id?: number) => void;
  initialData: DefaultRoleResponseDto | null;
  onCloseForm: () => void;
  permissions: DefaultPermissionResponseDto[];
}

export function RoleForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  onCloseForm,
  permissions,
}: RoleFormProps) {
  const [formData, setFormData] = useState<DefaultRoleRequestDto>({
    name: "",
    description: "",
    active: true,
    permissions: [],
  });

  // Check tab nào đang được xổ ra
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
        permissions: initialData.permissions.map((permission) => ({
          id: permission.id,
        })),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        active: true,
        permissions: [],
      });
    }
  }, [initialData]);

  // Group permissions by module
  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as Record<string, DefaultPermissionResponseDto[]>,
  );

  const toggleModule = (module: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(module)) {
      newExpanded.delete(module);
    } else {
      newExpanded.add(module);
    }
    setExpandedModules(newExpanded);
  };

  const isPermissionSelected = (permissionId: number) => {
    return formData.permissions.some((p) => p.id === permissionId);
  };

  const togglePermission = (permissionId: number) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.some((p) => p.id === permissionId);

      if (isSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => p.id !== permissionId),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, { id: permissionId }],
        };
      }
    });
  };

  const isDefaultRoleName = useMemo(
    () => initialData?.name === "USER" || initialData?.name === "ADMIN",
    [initialData],
  );

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
      <DialogContent className="flex !h-5/6 !max-h-none !w-full !max-w-none flex-col lg:!w-2/3">
        <DialogHeader>
          <DialogTitle className="text-center">
            Biểu mẫu thông tin chức vụ
          </DialogTitle>
          <DialogDescription className="text-center">
            {initialData ? "Chỉnh sửa chức vụ" : "Thêm chức vụ mới"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
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
                  disabled={isDefaultRoleName}
                />
                {isDefaultRoleName && (
                  <span className="text-sm text-red-600 italic">
                    Chức vụ mặc định không được phép đổi tên
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Mô tả <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  disabled={isDefaultRoleName}
                />
                {isDefaultRoleName && (
                  <span className="text-sm text-red-600 italic">
                    Chức vụ mặc định không được phép đổi mô tả
                  </span>
                )}
              </div>

              {/* Active */}
              <div className="flex items-center gap-3 py-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, active: checked }))
                  }
                  defaultChecked={true}
                />
                <Label htmlFor="active">
                  Hoạt động <span className="text-red-500">*</span>
                </Label>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="mb-4">
                <Label className="text-base font-medium">
                  Quyền hạn <span className="text-red-500">*</span>
                </Label>
                <p className="text-muted-foreground mt-1 text-sm">
                  Chọn các quyền hạn cho chức vụ này
                </p>
              </div>

              <div className="flex-1 overflow-y-auto rounded-lg border bg-gray-50/50 p-4">
                <div className="space-y-3">
                  {Object.entries(groupedPermissions).map(
                    ([module, modulePermissions]) => (
                      <Collapsible
                        key={module}
                        open={expandedModules.has(module)}
                        onOpenChange={() => toggleModule(module)}
                        className="rounded-lg border bg-white shadow-sm"
                      >
                        <CollapsibleTrigger className="hover:bg-muted/30 flex w-full items-center justify-between rounded-t-lg p-4 transition-colors">
                          <div className="flex items-center gap-3">
                            {expandedModules.has(module) ? (
                              <ChevronDown className="h-4 w-4 text-blue-600" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                              {module}
                            </span>
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                              {modulePermissions.length}
                            </span>
                          </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="px-4 pb-4">
                          <div className="mt-3 grid grid-cols-3 gap-3">
                            {modulePermissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border bg-white p-3 transition-colors"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="mb-2 text-sm font-medium">
                                    {permission.name}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`rounded-full px-1 py-1 text-center text-xs font-medium text-white ${getMethodColor(
                                        permission.method,
                                      )}`}
                                    >
                                      {permission.method}
                                    </span>
                                    <span className="text-muted-foreground truncate font-mono text-xs">
                                      {permission.apiPath}
                                    </span>
                                  </div>
                                </div>
                                <Switch
                                  checked={isPermissionSelected(permission.id)}
                                  onCheckedChange={() =>
                                    togglePermission(permission.id)
                                  }
                                  className="ml-3 flex-shrink-0"
                                />
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
