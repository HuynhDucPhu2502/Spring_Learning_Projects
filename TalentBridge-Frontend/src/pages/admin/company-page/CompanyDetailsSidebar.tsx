import { useState, useEffect } from "react";
import { X, Building2, MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { formatISO } from "@/utils/convertHelper.ts";
import RichTextPreview from "@/components/custom/RichText/index-preview";

interface CompanyDetailsSidebarProps {
  company: DefaultCompanyResponseDto | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (company: DefaultCompanyResponseDto) => void;
  onDelete?: (id: number) => void;
}

export function CompanyDetailsSidebar({
  company,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: CompanyDetailsSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`z-[100] bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-96 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          position: "fixed",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        {company && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white p-6">
              <h2 className="text-lg font-semibold">Chi tiết công ty</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 overflow-y-auto bg-white p-6">
              {/* Company Logo & Name */}
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
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
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {company.name}
                  </h3>
                  <Badge variant="secondary" className="mt-2">
                    ID: {company.id}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Company Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Địa chỉ
                  </label>
                  <div className="mt-2 flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <p className="text-gray-900">{company.address}</p>
                  </div>
                </div>

                {company.description && (
                  <div>
                    <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Mô tả
                    </label>
                    <RichTextPreview content={company.description} />
                  </div>
                )}
              </div>

              <Separator />

              {/* Timestamps */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Ngày tạo:</span>
                  <span className="font-medium text-gray-900">
                    {formatISO(company.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Cập nhật:</span>
                  <span className="font-medium text-gray-900">
                    {formatISO(company.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t bg-white p-6">
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => onEdit?.(company)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>

                <DeleteConfirmDialog
                  onConfirm={() => onDelete?.(company.id)}
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
                >
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
