import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Company } from "@/types/company";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { EmptyState } from "@/components/custom/EmptyState";

interface CompanyTableProps {
  companies: Company[];
  isLoading: boolean;
  hoveredCompany: Company | null;
  onViewDetails: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

export function CompanyTable({
  companies,
  isLoading,
  hoveredCompany,
  onViewDetails,
  onEdit,
  onDelete,
}: CompanyTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Mã</TableHead>
            <TableHead>Tên công ty</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Lần cập nhật gần</TableHead>
            <TableHead className="w-24">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            companies.map((company) => {
              const isActive = hoveredCompany?.id === company.id;
              return (
                <TableRow
                  key={company.id}
                  className={`cursor-pointer transition-colors duration-200 ${
                    isActive ? "bg-muted/40" : "hover:bg-muted/50"
                  }`}
                  onClick={() => onViewDetails(company)}
                >
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {company.createdAt}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {company.updatedAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-orange-500 hover:text-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(company);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <DeleteConfirmDialog
                        onConfirm={() => onDelete(company.id)}
                        title="Bạn có chắc muốn xóa công ty này?"
                        description="Hành động này sẽ xóa công ty khỏi hệ thống và không thể hoàn tác."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

          {!isLoading && companies.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState
                  title="Không tìm thấy công ty nào"
                  description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới"
                  icon={
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
