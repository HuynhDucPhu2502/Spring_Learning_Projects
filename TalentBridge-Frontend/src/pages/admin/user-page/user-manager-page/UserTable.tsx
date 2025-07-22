import { Edit, KeyRound, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog.tsx";
import { EmptyState } from "@/components/custom/EmptyState.tsx";
import LoadingSpinner from "@/components/custom/LoadingSpinner.tsx";
import { formatISO } from "@/utils/convertHelper.ts";

import type { DefaultUserResponseDto } from "@/types/user";
import HasPermission from "@/pages/commons/HasPermission.tsx";

interface UserTableProps {
  users: DefaultUserResponseDto[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-600">
      <Table>
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableHead className="text-center font-bold text-white">
              ID
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Tên người dùng
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Email
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Lần cập nhật gần nhất
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex justify-center py-6">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState
                  title="Không tìm thấy người dùng nào"
                  description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm người dùng mới"
                  icon={
                    <KeyRound className="text-muted-foreground mb-4 h-12 w-12" />
                  }
                />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-center">{user.id}</TableCell>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">
                  {formatISO(user.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  {formatISO(user.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <HasPermission perm={"PUT /users"}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-orange-500 hover:text-orange-600"
                        onClick={() => onEdit(user.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </HasPermission>

                    <HasPermission perm={"DELETE /users/{id}"}>
                      <DeleteConfirmDialog onConfirm={() => onDelete(user.id)}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteConfirmDialog>
                    </HasPermission>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
