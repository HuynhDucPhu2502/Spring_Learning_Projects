import { useState, useMemo, useEffect } from "react";
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

interface UpdateResumeDialogProps {
  onSubmitFile: (file: File) => Promise<void>;
}

export function UpdateResumeDialog({ onSubmitFile }: UpdateResumeDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      if (file.type !== "application/pdf") {
        alert("Chỉ chấp nhận file PDF");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File không được vượt quá 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

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
        className="bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        type="button"
      >
        <FileEdit className="mr-2 h-5 w-5" />
        Cập nhật hồ sơ
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex !h-11/12 !max-h-none !w-full !max-w-none flex-col lg:!w-2/3">
          <DialogHeader>
            <DialogTitle className="text-xl">Cập nhật hồ sơ PDF</DialogTitle>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            {!selectedFile ? (
              <div className="flex flex-1 flex-col justify-center">
                <Label htmlFor="cv-upload" className="mb-4 text-sm font-medium">
                  CV mới (PDF)
                </Label>
                <div className="flex flex-1 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <div className="mb-4 text-base text-gray-600">
                    Kéo thả file hoặc click để chọn file PDF mới
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
                  <div className="mt-4 text-xs text-gray-500">
                    Dung lượng tối đa 5MB
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                {/* File Info Header */}
                <div className="mb-4 flex flex-shrink-0 items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
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
                <ScrollArea className="mt-2 h-[200px] rounded-lg border bg-gray-50 p-4 sm:h-[300px] md:h-[350px] lg:h-[450px]">
                  <PDFViewer fileUrl={fileUrl} />
                </ScrollArea>
              </div>
            )}

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
                className="flex-1 bg-blue-600 py-3 hover:bg-blue-700"
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
