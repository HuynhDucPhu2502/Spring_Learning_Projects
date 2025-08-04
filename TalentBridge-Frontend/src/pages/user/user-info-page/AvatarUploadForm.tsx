import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface AvatarUploadFormProps {
  currentAvatarUrl?: string;
  userName: string;
  onSubmit: (file: File) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AvatarUploadForm = ({
  currentAvatarUrl,
  userName,
  onSubmit,
  onCancel,
  isLoading = false,
}: AvatarUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP)");
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("Kích thước file không được vượt quá 5MB");
      return false;
    }

    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Vui lòng chọn file ảnh");
      return;
    }

    onSubmit(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setError("");
      if (validateFile(file)) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50 p-4">
      <Card className="!w-1/3 !max-w-none border-orange-200 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-800">
              <Camera className="h-5 w-5" />
              Cập nhật ảnh đại diện
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Avatar Display */}
            <div className="text-center">
              <div className="mb-4">
                <Avatar className="mx-auto h-24 w-24 border-4 border-orange-200">
                  <AvatarImage
                    src={previewUrl || currentAvatarUrl || "/placeholder.svg"}
                    alt={userName}
                  />
                  <AvatarFallback className="bg-blue-500 text-xl font-bold text-white">
                    {getUserInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-gray-600">
                {previewUrl ? "Ảnh mới được chọn" : "Ảnh hiện tại"}
              </p>
            </div>

            {/* File Upload Area */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Chọn ảnh mới *
              </Label>

              <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                  error
                    ? "border-red-300 bg-red-50"
                    : "border-orange-300 bg-orange-50 hover:border-orange-400"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <ImageIcon className="mx-auto mb-4 size-6 text-orange-400" />
                <p className="mb-2 text-sm text-gray-600">
                  Kéo thả ảnh vào đây hoặc
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Chọn file
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-green-600" />
                      <span className="overflow-hidden text-sm text-ellipsis text-green-800">
                        {selectedFile.name}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearSelection}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !selectedFile}
                className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Cập nhật ảnh
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvatarUploadForm;
