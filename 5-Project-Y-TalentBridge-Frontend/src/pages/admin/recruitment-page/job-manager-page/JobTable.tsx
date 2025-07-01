import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Briefcase } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { EmptyState } from "@/components/custom/EmptyState";
import { formatISO } from "@/utils/convertHelper";
import type { Job } from "@/types/job";

interface JobTableProps {
  jobs: Job[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (job: Job) => void;
}

export function JobTable({
  jobs,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: JobTableProps) {
  const getStatusBadge = (active: boolean) => {
    const status = active ? "Active" : "Inactive";
    const variants = {
      Active: "default",
      Inactive: "secondary",
      Draft: "outline",
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getLevelBadge = (level: Job["level"]) => {
    const colors = {
      INTERN: "bg-gray-100 text-gray-800",
      FRESHER: "bg-green-100 text-green-800",
      MIDDLE: "bg-yellow-100 text-yellow-800",
      SENIOR: "bg-orange-100 text-orange-800",
    };

    return <Badge className={colors[level]}>{level}</Badge>;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-blue-600">
      <Table>
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableHead className="text-center font-bold text-white">
              ID
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Tên Công việc
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Công ty
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Trình độ
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Trạng thái
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Ngày kết thúc
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={8}>
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
              </TableCell>
            </TableRow>
          )}

          {!isLoading && jobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={8}>
                <EmptyState
                  title="Không tìm thấy công việc nào"
                  description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công việc mới"
                  icon={
                    <Briefcase className="text-muted-foreground h-12 w-12" />
                  }
                />
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            jobs.map((job) => (
              <TableRow
                key={job.id}
                onClick={() => onView(job)}
                className="cursor-pointer transition-colors duration-200 hover:bg-blue-500/10"
              >
                <TableCell className="text-center text-sm">{job.id}</TableCell>
                <TableCell className="text-center text-sm">
                  {job.name}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {job.company.name}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {getLevelBadge(job.level)}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {getStatusBadge(job.active)}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {formatISO(job.startDate)}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {formatISO(job.endDate)}
                </TableCell>
                <TableCell>
                  <div
                    className="flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()} // ngăn event bubble
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(job.id)}
                    >
                      <Edit className="h-4 w-4 text-orange-500" />
                    </Button>
                    <DeleteConfirmDialog
                      onConfirm={() => onDelete(job.id)}
                      title="Bạn có chắc muốn xóa công việc này?"
                      description="Hành động này sẽ xóa công việc khỏi hệ thống và không thể hoàn tác."
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
