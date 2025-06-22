"use client";

import { useState, useEffect } from "react";
import { X, Building2, MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Company } from "@/types/company";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";

interface CompanyDetailsSidebarProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (company: Company) => void;
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
        className={`fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300 ${
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
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          position: "fixed",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        {company && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-white">
              <h2 className="text-lg font-semibold">Chi tiết công ty</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {/* Company Logo & Name */}
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {company.logo ? (
                    <img
                      src="/company-logo-placeholder.png"
                      alt={`${company.name} logo`}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
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
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Địa chỉ
                  </label>
                  <div className="mt-2 flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-900">{company.address}</p>
                  </div>
                </div>

                {company.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Mô tả
                    </label>
                    <div
                      className="mt-2 text-gray-900 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: company.description }}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Timestamps */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Ngày tạo:</span>
                  <span className="text-gray-900 font-medium">
                    {company.createdAt}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Cập nhật:</span>
                  <span className="text-gray-900 font-medium">
                    {company.updatedAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t p-6 bg-white">
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => onEdit?.(company)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>

                <DeleteConfirmDialog
                  onConfirm={() => onDelete?.(company.id)}
                  title="Bạn có chắc muốn xóa công ty này?"
                  description="Hành động này sẽ xóa công ty khỏi hệ thống và không thể hoàn tác."
                >
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-2" />
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
