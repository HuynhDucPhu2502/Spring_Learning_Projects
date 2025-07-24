import { getErrorMessage } from "@/features/slices/auth/authThunk";
import {
  deletePermissionById,
  findAllPermissions,
  savePermission,
  updatePermissionById,
} from "@/services/permissionApi";
import type {
  DefaultPermissionRequestDto,
  DefaultPermissionResponseDto,
} from "@/types/permission.d.ts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PermissionSearchSection } from "./PermissionSearchSection";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Pagination from "@/components/custom/Pagination";
import { PermissionTable } from "./PermissionTable";
import { PermissionForm } from "./PermissionForm";

const PermissionManagerPage = () => {
  // Data
  const [permissions, setPermissions] = useState<
    DefaultPermissionResponseDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchName, setSearchName] = useState("");
  const [searchApiPath, setsearchApiPath] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ============================
  // Dialog State
  // ============================
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<DefaultPermissionResponseDto | null>(null);

  const handleOpenCreateForm = () => {
    setSelectedPermission(null);
    setisDialogOpen(true);
  };

  const handleOpenEditForm = (permission: DefaultPermissionResponseDto) => {
    setSelectedPermission(permission);
    setisDialogOpen(true);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchPermissions = async (
    page: number,
    size: number,
    searchName: string,
    searchApiPath: string,
  ) => {
    setIsLoading(true);

    try {
      const filters: string[] = [];

      if (searchName) filters.push(`name ~ '*${searchName}*'`);
      if (searchApiPath) filters.push(`apiPath ~ '*${searchApiPath}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllPermissions({ page, size, filter })).data.data;
      setPermissions(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(1, itemsPerPage, searchName, searchApiPath);
    setCurrentPage(1);
  }, [itemsPerPage, searchName, searchApiPath]);

  useEffect(() => {
    fetchPermissions(currentPage, itemsPerPage, searchName, searchApiPath);
  }, [currentPage, itemsPerPage, searchName, searchApiPath]);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchName("");
    setsearchApiPath("");
    setCurrentPage(1);
  };

  // ============================
  // HANDLE CREATE OR UPDATE
  // ============================
  const handleSubmitUpsert = async (
    data: DefaultPermissionRequestDto,
    id?: number,
  ) => {
    try {
      setIsLoading(true);

      if (id) {
        await updatePermissionById(id, data);
        await fetchPermissions(1, itemsPerPage, searchName, searchApiPath);
        toast.success("Cập nhật quyền hạn mới thành công");
      } else {
        await savePermission(data);
        await fetchPermissions(1, itemsPerPage, searchName, searchApiPath);
        toast.success("Tạo quyền hạn mới thành công");
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

      await deletePermissionById(id);
      await fetchPermissions(1, itemsPerPage, searchName, searchApiPath);

      toast.success("Xóa quyền hạn thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PermissionSearchSection
        searchName={searchName}
        setSearchName={setSearchName}
        searchApiPath={searchApiPath}
        setsearchApiPath={setsearchApiPath}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách Kỹ năng</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleOpenCreateForm}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm quyền hạn
        </Button>
      </div>

      <PermissionTable
        permissions={permissions}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={handleOpenEditForm}
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

      <PermissionForm
        open={isDialogOpen}
        onOpenChange={setisDialogOpen}
        initialData={selectedPermission}
        onSubmit={handleSubmitUpsert}
        onCloseForm={() => setSelectedPermission(null)}
      />
    </div>
  );
};

export default PermissionManagerPage;
