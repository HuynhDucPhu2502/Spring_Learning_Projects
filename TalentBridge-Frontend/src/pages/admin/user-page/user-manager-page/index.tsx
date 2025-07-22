import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import { deleteUserById, getUserList } from "@/services/userApi.ts";
import type { DefaultUserResponseDto } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserSearchSection } from "./UserSeachSection.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import Pagination from "@/components/custom/Pagination.tsx";
import { UserTable } from "./UserTable.tsx";
import { useNavigate } from "react-router-dom";
import HasPermission from "@/pages/commons/HasPermission.tsx";

const UserManagerPage = () => {
  const navigate = useNavigate();

  // ============================
  // Data
  // ============================
  const [users, setUsers] = useState<DefaultUserResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ============================
  // Search State
  // ============================
  const [searchUserName, setSearchUserName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchUsers = async (
    page: number,
    size: number,
    searchUserName: string,
    searchEmail: string,
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchUserName) filters.push(`name ~ '*${searchUserName}*'`);
      if (searchEmail) filters.push(`email ~ '*${searchEmail}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await getUserList({ page, size, filter })).data.data;
      setUsers(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách người dùng"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, searchUserName, searchEmail);
  }, [currentPage, itemsPerPage, searchUserName, searchEmail]);

  useEffect(() => {
    fetchUsers(1, itemsPerPage, searchUserName, searchEmail);
    setCurrentPage(1);
  }, [itemsPerPage, searchUserName, searchEmail]);

  // ============================
  // HANDLE NAVIGATE UPSERT PAGE
  // ============================
  const handleOpenCreatePage = () => {
    navigate("upsert");
  };

  const handleOpenEditPage = (id: number) => {
    navigate(`upsert?id=${id}`);
  };

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchUserName("");
    setSearchEmail("");
    setCurrentPage(1);
  };

  // ============================
  // HANDLE DELETE
  // ============================
  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);

      await deleteUserById(id);
      await fetchUsers(1, itemsPerPage, searchUserName, searchEmail);

      toast.success("Xóa người dùng thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <UserSearchSection
        searchUserName={searchUserName}
        setSearchUserName={setSearchUserName}
        searchEmail={searchEmail}
        setSearchEmail={setSearchEmail}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách người dùng</h2>
        <HasPermission perm={"POST /users"}>
          <Button
            onClick={handleOpenCreatePage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </HasPermission>
      </div>

      <UserTable
        users={users}
        isLoading={isLoading}
        onEdit={handleOpenEditPage}
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
    </div>
  );
};

export default UserManagerPage;
