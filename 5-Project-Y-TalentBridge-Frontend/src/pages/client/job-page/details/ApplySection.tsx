import React, { useState, useMemo, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Send, Upload, X, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAppSelector } from "@/features/hooks";
import PDFViewer from "@/components/custom/PDFViewer";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import type { CreateResumeRequestDto } from "@/types/resume";
import { saveResume } from "@/services/resumeApi";

interface ApplySectionProps {
  jobId: number;
  jobTitle: string;
}

export function ApplySection({ jobId, jobTitle }: ApplySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isLogin, user } = useAppSelector((state) => state.auth);

  // =============================
  // HANDLE PROCESS FILE
  // =============================

  const fileUrl = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : "";
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleApplyClick = () => {
    if (!isLogin) {
      toast.error("Bạn cần đăng nhập để ứng tuyển vị trí này");
      return;
    }

    setIsModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Chỉ chấp nhận file PDF");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File không được vượt quá 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  // =============================
  // HANDLE MODAL ACTION
  // =============================

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn file CV");
      return;
    }

    setIsLoading(true);
    try {
      const createResumeRequestDto: CreateResumeRequestDto = {
        email: user.email,
        status: "PENDING",
        user: { id: parseInt(user.id) },
        job: { id: jobId },
      };

      const formData = new FormData();
      formData.append("pdfFile", selectedFile);
      formData.append(
        "resume",
        new Blob([JSON.stringify(createResumeRequestDto)], {
          type: "application/json",
        }),
      );

      await saveResume(formData);

      toast.success("Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Không thể Ứng tuyển"));
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {/* Static Apply Button */}
      <div className="my-12 rounded-lg border bg-white p-6">
        <Button
          onClick={handleApplyClick}
          className="w-full bg-orange-600 py-10 font-semibold text-white hover:bg-orange-700"
        >
          Ứng tuyển ngay
        </Button>
      </div>

      {/* Floating Apply Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={handleApplyClick}
          className="animate-bounce rounded-full bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-700 hover:shadow-xl"
          size="lg"
        >
          <Send className="mr-2 h-5 w-5" />
          Nộp CV
        </Button>
      </div>

      {/* Apply Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex h-[95vh] max-h-[95vh] !w-2/3 !max-w-none flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Ứng tuyển vị trí</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {jobTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            {!selectedFile ? (
              <div className="flex flex-1 flex-col justify-center">
                <Label htmlFor="cv-upload" className="mb-4 text-sm font-medium">
                  CV của bạn (PDF) <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-1 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-colors hover:border-orange-400">
                  <Upload className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                  <div className="mb-4 text-lg text-gray-600">
                    Kéo thả file CV hoặc click để chọn
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      document.getElementById("cv-upload")?.click()
                    }
                    className="mx-auto"
                  >
                    Chọn file PDF
                  </Button>
                  <div className="mt-4 text-sm text-gray-500">Tối đa 5MB</div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                {/* File Info Header */}
                <div className="mb-4 flex flex-shrink-0 items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedFile.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* PDF Viewer */}
                <div className="min-h-0 flex-1 overflow-hidden rounded-lg border">
                  <PDFViewer fileUrl={fileUrl} />
                </div>
              </div>
            )}

            {/* Submit Buttons*/}
            <div className="flex flex-shrink-0 gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3"
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedFile || isLoading}
                className="flex-1 bg-orange-600 py-3 hover:bg-orange-700"
              >
                {isLoading ? "Đang gửi..." : "Ứng tuyển"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
