import type {
  DefaultRoleRequestDto,
  DefaultRoleResponseDto,
} from "@/types/role.d.ts";
import { useEffect, useState } from "react";
import { RoleSearchSection } from "@/pages/admin/access-control-page/role-page/RoleSearchSection.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import Pagination from "@/components/custom/Pagination.tsx";
import {
  deleteRoleById,
  findAllRoles,
  saveRole,
  updateRoleById,
} from "@/services/roleApi.ts";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import { RoleTable } from "@/pages/admin/access-control-page/role-page/RoleTable.tsx";
import { RoleForm } from "@/pages/admin/access-control-page/role-page/RoleForm.tsx";
import { findAllPermissionsNoPaging } from "@/services/permissionApi";
import type { DefaultPermissionResponseDto } from "@/types/permission";
import HasPermission from "@/pages/commons/HasPermission.tsx";

const RoleManagerPage = () => {
  // Data
  const [roles, setRoles] = useState<DefaultRoleResponseDto[]>([]);
  const [permissions, setPermissions] = useState<
    DefaultPermissionResponseDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchRoleName, setSearchRoleName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // ============================
  // Dialog State
  // ============================
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] =
    useState<DefaultRoleResponseDto | null>(null);

  const handleOpenCreateForm = () => {
    setSelectedRole(null);
    setisDialogOpen(true);
  };

  const handleOpenEditForm = (role: DefaultRoleResponseDto) => {
    setSelectedRole(role);
    setisDialogOpen(true);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchRoles = async (
    page: number,
    size: number,
    searchRoleName: string,
  ) => {
    setIsLoading(true);

    try {
      const filters: string[] = [];

      if (searchRoleName) filters.push(`name ~ '*${searchRoleName}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllRoles({ page, size, filter })).data.data;
      setRoles(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(1, itemsPerPage, searchRoleName);
    setCurrentPage(1);
  }, [itemsPerPage, searchRoleName]);

  useEffect(() => {
    fetchRoles(currentPage, itemsPerPage, searchRoleName);
  }, [currentPage, itemsPerPage, searchRoleName]);

  useEffect(() => {
    const fetchPermissions = async () => {
      setIsLoading(true);

      try {
        const res = (await findAllPermissionsNoPaging()).data;
        setPermissions(res.data);
      } catch (err) {
        toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchRoleName("");
    setCurrentPage(1);
  };

  // ============================
  // HANDLE CREATE OR UPDATE
  // ============================
  const handleSubmitUpsert = async (
    data: DefaultRoleRequestDto,
    id?: number,
  ) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateRoleById(id, data);
        await fetchRoles(1, itemsPerPage, searchRoleName);
        toast.success("Cập nhật chức vụ mới thành công");
      } else {
        await saveRole(data);
        await fetchRoles(1, itemsPerPage, searchRoleName);
        toast.success("Tạo chức vụ mới thành công");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // HANDLE DELETE
  // ============================
  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);

      await deleteRoleById(id);
      await fetchRoles(1, itemsPerPage, searchRoleName);

      toast.success("Xóa chức vụ thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <RoleSearchSection
        searchRoleName={searchRoleName}
        setSearchRoleName={setSearchRoleName}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách chức vụ</h2>
        <HasPermission perm={"POST /roles"}>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleOpenCreateForm}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm chức vụ
          </Button>
        </HasPermission>
      </div>

      <RoleTable
        roles={roles}
        isLoading={isLoading}
        onEdit={handleOpenEditForm}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
      />

      <RoleForm
        open={isDialogOpen}
        onOpenChange={setisDialogOpen}
        initialData={selectedRole}
        onSubmit={handleSubmitUpsert}
        onCloseForm={() => setSelectedRole(null)}
        permissions={permissions}
      />
    </div>
  );
};

export default RoleManagerPage;
