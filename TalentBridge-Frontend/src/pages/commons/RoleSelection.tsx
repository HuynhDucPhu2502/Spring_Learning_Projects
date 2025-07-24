"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search, Shield, X } from "lucide-react";
import { toast } from "sonner";
import { findAllRoles } from "@/services/roleApi.ts";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import Pagination from "@/components/custom/Pagination.tsx";
import { EmptyState } from "@/components/custom/EmptyState.tsx";
import LoadingSpinner from "@/components/custom/LoadingSpinner.tsx";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { RoleSummary } from "@/types/role";

interface RoleSelectionProps {
  selectedRole: RoleSummary | undefined;
  addRole: (role: RoleSummary) => void;
  removeRole: () => void;
}

const RoleSelection = ({
  selectedRole,
  addRole,
  removeRole,
}: RoleSelectionProps) => {
  // ============================
  // Modal State
  // ============================
  const [showDialog, setShowDialog] = useState(false);
  const closeModal = () => setShowDialog(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // ============================
  // Fetching State
  // ============================
  const [searchRoleName, setSearchRoleName] = useState("");
  const [roles, setRoles] = useState<RoleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoles = async (
    page: number,
    size: number,
    searchRoleName: string,
  ) => {
    setIsLoading(true);
    try {
      const filter = searchRoleName ? `name ~ '*${searchRoleName}*'` : null;

      const res = await findAllRoles({ page, size, filter });
      const data = res.data.data;

      setRoles(data.content);
      setTotalElements(data.totalElements);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách vai trò."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(currentPage, itemsPerPage, searchRoleName);
  }, [currentPage, itemsPerPage, searchRoleName]);

  // ============================
  // Handle Add Role
  // ============================
  const onAddRole = (role: RoleSummary) => {
    addRole(role);
    closeModal();
  };

  return (
    <div className="space-y-2">
      <Label>
        Vai trò <span className="text-red-500">*</span>
      </Label>

      <div className="rounded-md border bg-gray-50/50 p-3">
        {selectedRole && (
          <div className="mb-3 flex min-h-[100px] items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  {selectedRole.name}
                </span>
                <p className="text-xs text-gray-500">
                  {selectedRole.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 hover:bg-red-50 hover:text-red-600"
              onClick={removeRole}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!selectedRole && (
          <div className="mb-3 flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div>
              <Shield className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Chưa chọn vai trò</p>
            </div>
          </div>
        )}

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-dashed bg-transparent"
            >
              <Shield className="mr-2 h-4 w-4" />
              {selectedRole ? "Đổi vai trò" : "Chọn vai trò"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Chọn vai trò
              </DialogTitle>
              <DialogDescription>role selection panel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Tìm kiếm vai trò..."
                  value={searchRoleName}
                  onChange={(e) => setSearchRoleName(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
                {isLoading && (
                  <div className="flex justify-center py-6">
                    <LoadingSpinner />
                  </div>
                )}

                {roles.length === 0 && !isLoading && (
                  <div className="py-8 text-center">
                    <EmptyState
                      title="Không tìm thấy vai trò nào"
                      description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm vai trò mới"
                      icon={
                        <Shield className="text-muted-foreground h-12 w-12" />
                      }
                    />
                  </div>
                )}

                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="group cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md"
                    onClick={() => onAddRole(role)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold break-all whitespace-normal">
                          {role.name}
                        </h4>
                        <p className="text-sm break-all whitespace-normal text-gray-600">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isLoading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  showItemsPerPageSelect={false}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoleSelection;
