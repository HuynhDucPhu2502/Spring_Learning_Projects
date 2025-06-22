import { TableRow, TableCell } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { Company } from "@/types/company";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";

interface CompanyRowProps {
  company: Company;
  isActive: boolean;
  isLoading: boolean;
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const CompanyRow = ({
  company,
  isActive,
  onViewDetails,
  onEdit,
  onDelete,
}: CompanyRowProps) => {
  return (
    <TableRow
      className={`cursor-pointer transition-colors duration-200 ${
        isActive ? "bg-muted/40" : "hover:bg-muted/50"
      }`}
      onClick={onViewDetails}
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
              onEdit();
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <DeleteConfirmDialog
            onConfirm={onDelete}
            title="Bạn có chắc muốn xóa công ty này?"
            description="Hành động này sẽ xóa công ty khỏi hệ thống và không thể hoàn tác."
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
