import type { DefaultRoleResponseDto } from "@/types/role.types.ts";
import { useEffect, useState } from "react";
import { RoleSearchSection } from "@/pages/admin/access-control-page/role-page/RoleSearchSection.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import Pagination from "@/components/custom/Pagination.tsx";
import { getRolesList } from "@/services/roleApi.ts";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import { RoleTable } from "@/pages/admin/access-control-page/role-page/RoleTable.tsx";

const RoleManagerPage = () => {
  // Data
  const [roles, setRoles] = useState<DefaultRoleResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchRoleName, setSearchRoleName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<DefaultRoleResponseDto | null>(
    null,
  );

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchPermissions = async (
    page: number,
    size: number,
    searchRoleName: string,
  ) => {
    setIsLoading(true);

    try {
      const filters: string[] = [];

      if (searchRoleName) filters.push(`name ~ '*${searchRoleName}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await getRolesList({ page, size, filter })).data.data;
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
    fetchPermissions(1, itemsPerPage, searchRoleName);
    setCurrentPage(1);
  }, [itemsPerPage, searchRoleName]);

  useEffect(() => {
    fetchPermissions(currentPage, itemsPerPage, searchRoleName);
  }, [currentPage, itemsPerPage, searchRoleName]);

  return (
    <div className="space-y-6">
      <RoleSearchSection
        searchRoleName={searchRoleName}
        setSearchRoleName={setSearchRoleName}
        onReset={() => {}}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách chức vụ</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          // onClick={openCreateForm}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm chức vụ
        </Button>
      </div>

      <RoleTable
        roles={roles}
        isLoading={isLoading}
        onEdit={(role) => {}}
        onDelete={(id) => {}}
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
    </div>
  );
};

export default RoleManagerPage;
