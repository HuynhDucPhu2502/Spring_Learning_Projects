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
import type { Skill } from "@/types/skill";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";

interface SkillTableProps {
  skills: Skill[];
  isLoading: boolean;
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
}

export function SkillTable({
  skills,
  isLoading,
  onEdit,
  onDelete,
}: SkillTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Tên kỹ năng</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead className="w-24">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex justify-center py-6">
                  <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          ) : skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    Không tìm thấy kỹ năng nào
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Thử thay đổi tiêu chí tìm kiếm
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.id}</TableCell>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.createdAt}</TableCell>
                <TableCell>{skill.updatedAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => onEdit(skill)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmDialog onConfirm={() => onDelete(skill.id)}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DeleteConfirmDialog>
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
