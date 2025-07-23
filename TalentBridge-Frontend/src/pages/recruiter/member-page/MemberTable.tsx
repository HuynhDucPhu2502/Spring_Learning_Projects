import { KeyRound, Trash2 } from "lucide-react";
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

import type { RecruiterInfoResponseDto } from "@/types/user";
import { Badge } from "@/components/ui/badge";

interface MemberTableProps {
  users: RecruiterInfoResponseDto[];
  isLoading: boolean;
  onDelete: (email: string) => void;
  isOwner: boolean;
}

export function MemberTable({
  users,
  isLoading,
  onDelete,
  isOwner,
}: MemberTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-purple-600">
      <Table>
        <TableHeader className="bg-purple-600 text-white">
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
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex justify-center py-6">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
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
                <TableCell className="text-center">
                  {user.name} {user.owner && <Badge>OWNER</Badge>}
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell>
                  {isOwner && (
                    <div className="flex items-center justify-center gap-2">
                      {!user.owner && (
                        <DeleteConfirmDialog
                          onConfirm={() => onDelete(user.email)}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DeleteConfirmDialog>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
