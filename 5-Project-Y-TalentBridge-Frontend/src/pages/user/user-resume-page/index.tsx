import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import {
  getResumsByUserId,
  removeResumeByUserIdAndJobId,
  updateResumeFileByResumeId,
} from "@/services/resumeApi";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { useAppSelector } from "@/features/hooks";
import Pagination from "@/components/custom/Pagination";
import ResumeCard from "./ResumeCard";
import type { ResumeForDisplayResponseDto } from "@/types/resume";

export default function UserResumePage() {
  const { user } = useAppSelector((state) => state.auth);

  // ===================
  // Data
  // ===================
  const [resumes, setResumes] = useState<ResumeForDisplayResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ===================
  // Pagination
  // ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ===================
  // Handle Fetching
  // ===================
  const fetchResumes = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const res = (
        await getResumsByUserId({
          page: currentPage,
          size: itemsPerPage,
          userId: user.id,
          filter: null,
        })
      ).data.data;

      setResumes(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách hồ sơ."));
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, user?.id]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // ===================
  // Handle Delete
  // ===================
  const handleDeleteResume = async (jobId: number) => {
    try {
      setIsLoading(true);
      await removeResumeByUserIdAndJobId(parseInt(user?.id || ""), jobId);
      toast.success("Rút đơn thành công");
      await fetchResumes();
    } catch (err) {
      toast.error(getErrorMessage(err, "Rút đơn thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ===================
  // Handle Update Resume
  // ===================
  const handleUpdateResumeFile = async (resumeId: number, file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("pdfFile", file);
      await updateResumeFileByResumeId(resumeId, formData);
      await fetchResumes();
    } catch (err) {
      toast.error(getErrorMessage(err, "Cập nhật hồ sơ thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="my-4 text-2xl font-bold text-gray-900">
        Hồ sơ tuyển dụng {totalElements > 0 && `(${totalElements})`}
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-4 rounded bg-white p-6 shadow"
            >
              <div className="h-4 w-1/2 rounded bg-gray-300" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-2/4 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <FileText className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Chưa có hồ sơ nào
            </h3>
            <p className="text-gray-500">Bạn chưa nộp hồ sơ ứng tuyển nào.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDeleteResume}
                onUpdateResumeFile={handleUpdateResumeFile}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalElements={totalElements}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showItemsPerPageSelect
            />
          </div>
        </>
      )}
    </div>
  );
}
