import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { type ReactNode } from "react";

interface DeleteConfirmDialogProps {
  onConfirm: () => void;
  description?: string;
  title?: string;
  children?: ReactNode;
  styledDescription?: ReactNode;
}

export const DeleteConfirmDialog = ({
  onConfirm,
  description = "Hành động này không thể hoàn tác.",
  styledDescription,
  title = "Bạn có chắc chắn muốn xóa?",
  children,
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="z-[9999]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {styledDescription ? styledDescription : description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-orange-500">
            Xác nhận xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
