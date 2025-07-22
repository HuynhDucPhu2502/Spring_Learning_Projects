import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  BadgeDollarSign,
  Layers3,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog.tsx";
import { formatISO } from "@/utils/convertHelper.ts";
import type { Job } from "@/types/job";
import RichTextPreview from "@/components/custom/RichText/index-preview.tsx";

interface JobDetailsSidebarProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (job: Job) => void;
  onDelete?: (id: number) => void;
}

export function JobDetailsSidebar({
  job,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: JobDetailsSidebarProps) {
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
        className={`fixed top-0 right-0 z-[101] h-screen w-96 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {job && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white p-6">
              <h2 className="text-lg font-semibold">Chi tiết công việc</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 overflow-y-auto bg-white p-6">
              {/* Job Title */}
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-bold text-gray-900">{job.name}</h3>
                <Badge variant="secondary">ID: {job.id}</Badge>
              </div>

              <Separator />

              {/* Company */}
              <div>
                <div className="my-4">
                  <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Công ty
                  </label>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div>
                    {job.company.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={`${job.company.name} logo`}
                        className="h-10 w-10 rounded-lg border object-contain"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div>{job.company.name}</div>
                </div>
              </div>

              {/* Skills */}
              {job.skills.length > 0 && (
                <>
                  <div className="my-4">
                    <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Kỹ năng yêu cầu
                    </label>
                  </div>

                  <div className="my-4">
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill.id} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Job Info */}
              <div className="my-4">
                <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                  Thông tin chung
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{job.location}</p>
                </div>

                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">
                    {job.salary === 0
                      ? "Thương lượng"
                      : job.salary.toLocaleString()}{" "}
                    VND
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">Số lượng: {job.quantity}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Layers3 className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">Cấp bậc: {job.level}</p>
                </div>
              </div>

              {/* Description */}

              <div className="my-4">
                <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                  Mô tả
                </label>
              </div>
              <RichTextPreview content={job.description} />

              <Separator />

              {/* Dates */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Ngày bắt đầu:</span>
                  <span className="font-medium text-gray-900">
                    {formatISO(job.startDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Ngày kết thúc:</span>
                  <span className="font-medium text-gray-900">
                    {formatISO(job.endDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t bg-white p-6">
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => onEdit?.(job)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>

                <DeleteConfirmDialog
                  onConfirm={() => onDelete?.(job.id)}
                  title="Bạn có chắc muốn xóa công việc này?"
                  styledDescription={
                    <p>
                      Hành động này sẽ
                      <span className="text-red-500">
                        {" "}
                        xóa CÔNG VIỆC và HỒ SƠ ỨNG VIÊN
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
