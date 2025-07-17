import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileEdit, Upload, X, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PDFViewer from "@/components/custom/PDFViewer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { checkFileSizeAndFileType } from "@/utils/fileMetadata";

interface UpdateResumeDialogProps {
  onSubmitFile: (file: File) => Promise<void>;
}

export function UpdateResumeDialog({ onSubmitFile }: UpdateResumeDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // =============================
  // INPUT REF
  // =============================
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const openInput = () => {
    if (pdfInputRef.current) pdfInputRef.current.click();
    else toast.error("Hệ thống đã gặp vấn đề");
  };

  // =============================
  // HANDLE PROCESS FILE
  // =============================
  const fileUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : ""),
    [selectedFile],
  );

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!checkFileSizeAndFileType(file, 5 * 1024 * 1024, "application/pdf")) {
        toast.error("File không hợp lệ");
        return;
      }

      setSelectedFile(file);
    }
  };

  // =============================
  // HANDLE ACTION
  // =============================
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file CV");
      return;
    }
    setIsLoading(true);
    try {
      await onSubmitFile(selectedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => setSelectedFile(null);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="border border-orange-500 bg-white py-3 font-semibold text-orange-500 hover:border-orange-600 hover:bg-orange-50"
        type="button"
      >
        <FileEdit className="mr-2 h-5 w-5" />
        Cập nhật hồ sơ
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex !h-11/12 !max-h-none !w-full !max-w-none flex-col lg:!w-2/3">
          <DialogHeader>
            <DialogTitle className="text-xl">Cập nhật hồ sơ PDF</DialogTitle>
            <DialogDescription>Tải lên hồ sơ PDF mới của bạn</DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            {!selectedFile ? (
              <div className="flex flex-1 flex-col justify-center">
                <Label htmlFor="cv-upload" className="mb-4 text-sm font-medium">
                  Hồ sơ xin việc mới <span className="text-red-500">*</span>
                </Label>
                <div
                  onClick={openInput}
                  className="flex flex-1 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-orange-300"
                >
                  <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <div className="mb-4 text-base text-gray-600">
                    Kéo thả file PDF vào đây hoặc{" "}
                    <span className="text-orange-500">nhấp để chọn file</span>
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={pdfInputRef}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      openInput();
                    }}
                    className="mx-auto"
                  >
                    Tải lên từ thiết bị
                  </Button>
                  <div className="mt-4 text-xs text-gray-500">
                    Dung lượng tối đa 5MB
                  </div>
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
                <ScrollArea className="h-[300px] border-2 md:h-[350px] lg:h-[400px]">
                  <PDFViewer fileUrl={fileUrl} />
                </ScrollArea>
              </div>
            )}

            <div className="mt-4 flex gap-4">
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
                {isLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
