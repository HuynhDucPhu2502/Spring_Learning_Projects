import { Edit, Trash2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { EmptyState } from "@/components/custom/EmptyState";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { formatISO } from "@/utils/convertHelper.ts";
import type { DefaultRoleResponseDto } from "@/types/role.d.ts";
import { Badge } from "@/components/ui/badge.tsx";
import HasPermission from "@/pages/commons/HasPermission.tsx";

interface RoleTableProps {
  roles: DefaultRoleResponseDto[];
  isLoading: boolean;
  onEdit: (role: DefaultRoleResponseDto) => void;
  onDelete: (id: number) => void;
}

export function RoleTable({
  roles,
  isLoading,
  onEdit,
  onDelete,
}: RoleTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-600">
      <Table>
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableHead className="text-center font-bold text-white">
              ID
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Tên chức vụ
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Trạng thái
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
          ) : roles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState
                  title="Không tìm thấy kỹ năng nào"
                  description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm kỹ năng mới"
                  icon={
                    <Wrench className="text-muted-foreground mb-4 h-12 w-12" />
                  }
                />
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="text-center">{role.id}</TableCell>
                <TableCell className="text-center">{role.name}</TableCell>
                <TableCell className="text-center">
                  {role.active ? (
                    <Badge className={"bg-green-500 text-white"}>ACTIVE</Badge>
                  ) : (
                    <Badge className={"bg-red-500 text-white"}>DE-ACTIVE</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatISO(role.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  {formatISO(role.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <HasPermission perm={"PUT /roles/{id}"}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-orange-500 hover:text-orange-600"
                        onClick={() => onEdit(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </HasPermission>

                    <HasPermission perm={"DELETE /roles/{id}"}>
                      <DeleteConfirmDialog onConfirm={() => onDelete(role.id)}>
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
