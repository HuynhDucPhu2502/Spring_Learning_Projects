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
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { EmptyState } from "@/components/custom/EmptyState";
import { formatISO } from "@/utils/convertHelper.ts";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import HasPermission from "@/pages/commons/HasPermission.tsx";

interface CompanyTableProps {
  companies: DefaultCompanyResponseDto[];
  isLoading: boolean;
  hoveredCompany: DefaultCompanyResponseDto | null;
  onViewDetails: (company: DefaultCompanyResponseDto) => void;
  onEdit: (company: DefaultCompanyResponseDto) => void;
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
    <div className="overflow-hidden rounded-lg border border-blue-600">
      <Table>
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableHead className="text-center font-bold text-white">
              ID
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Logo
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Tên công ty
            </TableHead>
            <TableHead className="w-[200px] text-center font-bold text-white">
              Địa chỉ
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="text-center font-bold text-white">
              Lần cập nhật gần
            </TableHead>
            <TableHead className="font-bold text-white">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          )}

          {!isLoading && companies.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  title="Không tìm thấy công ty nào"
                  description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới"
                  icon={
                    <Building2 className="text-muted-foreground h-12 w-12" />
                  }
                />
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            companies.length > 0 &&
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
                  <TableCell className="text-center font-medium">
                    {company.id}
                  </TableCell>
                  <TableCell className="flex items-center justify-center font-medium">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="h-20 w-20 rounded-lg border object-contain"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100">
                        <Building2 className="h-10 w-10 text-blue-600" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="w-[200px] text-center break-all whitespace-normal">
                    {company.name}
                  </TableCell>

                  <TableCell className="w-[200px] text-center break-all whitespace-normal">
                    {company.address}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center text-sm">
                    {formatISO(company.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center text-sm">
                    {formatISO(company.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <HasPermission perm={"PUT /companies/{id}"}>
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
                      </HasPermission>

                      <HasPermission perm={"DELETE /companies/{id}"}>
                        <DeleteConfirmDialog
                          onConfirm={() => onDelete(company.id)}
                          title="Bạn có chắc muốn xóa công ty này?"
                          styledDescription={
                            <p>
                              Hành động này sẽ
                              <span className="text-red-500">
                                {" "}
                                xóa CÔNG TY, CÔNG VIỆC và HỒ SƠ ỨNG VIÊN
                              </span>{" "}
                              đã nộp cho công việc này.
                            </p>
                          }
                        />
                      </HasPermission>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
