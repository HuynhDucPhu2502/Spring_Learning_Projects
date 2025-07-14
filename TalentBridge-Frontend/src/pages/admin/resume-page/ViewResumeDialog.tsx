import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BetweenVerticalStart } from "lucide-react";

import type {
  ResumeForDisplayResponseDto,
  UpdateResumeStatusRequestDto,
} from "@/types/resume";
import PDFViewer from "@/components/custom/PDFViewer";
import RichTextPreview from "@/components/custom/RichText/index-preview";
import { statusOptions } from "@/utils/tagColorMapper.ts";

interface ViewResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (resume: UpdateResumeStatusRequestDto) => Promise<void>;
  resume: ResumeForDisplayResponseDto;
  onCloseForm: () => void;
}

export function ViewResumeDialog({
  open,
  onOpenChange,
  onUpdate,
  resume,
  onCloseForm,
}: ViewResumeDialogProps) {
  const [status, setStatus] = useState(resume.status);
  const [openJobInfo, setOpenJobInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) setStatus(resume.status);
    else {
      setStatus("");
      setOpenJobInfo(false);
    }
  }, [open, resume.status]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const res: UpdateResumeStatusRequestDto = {
      id: resume.id,
      status,
    };
    await onUpdate(res);
    setIsLoading(false);

    onOpenChange(false);
    onCloseForm?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex !h-11/12 !max-h-none !w-full !max-w-none flex-col ${openJobInfo ? "lg:!w-11/12" : "lg:!w-2/3"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Hồ sơ ứng cử viên</DialogTitle>
          <DialogDescription className="text-center">
            Thông tin chi tiết của ứng cử viên
          </DialogDescription>
        </DialogHeader>

        <Button
          className={`w-fit hover:-translate-y-0.5 ${
            openJobInfo
              ? "border border-gray-100 bg-blue-500 text-white hover:bg-blue-500"
              : "border border-blue-500 bg-white text-blue-500 hover:bg-white"
          }`}
          onClick={() => setOpenJobInfo((v) => !v)}
        >
          <BetweenVerticalStart />
          {openJobInfo ? "Ẩn Job Info" : "Xem Job Info"}
        </Button>

        {!openJobInfo && (
          <ScrollArea className="h-3/4">
            <PDFViewer fileUrl={resume.pdfUrl} />
          </ScrollArea>
        )}

        {openJobInfo && (
          <div className="mt-2 min-h-0 flex-1">
            <div className="grid h-full w-full grid-cols-2 gap-12">
              {/* Cột 1: PDF */}

              <ScrollArea className="h-full min-h-0 border px-2">
                <h1 className="my-4 text-center text-3xl font-bold">
                  Hồ sơ ứng cử viên
                </h1>
                <PDFViewer fileUrl={resume.pdfUrl} />
              </ScrollArea>

              {/* Cột 2: Thông tin Job */}
              <ScrollArea className="h-full min-h-0 border px-2">
                <h1 className="my-4 text-center text-3xl font-bold">
                  Thông tin công việc
                </h1>
                <div className="flex h-full flex-col space-y-5">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Kỹ năng yêu cầu:
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resume.job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-blue-100 text-blue-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-700">
                      Mô tả công việc:
                    </span>
                    <RichTextPreview content={resume.job.description} />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem value={opt.value} key={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleUpdate}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600"
            disabled={isLoading}
          >
            Cập nhật
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
