import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import {
  findSelfResumes,
  removeSelfResumeByJobId,
  updateSelfResumeFile,
} from "@/services/resumeApi";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { useAppSelector } from "@/features/hooks";
import Pagination from "@/components/custom/Pagination";
import ResumeCard from "./ResumeCard";
import type { ResumeForDisplayResponseDto } from "@/types/resume";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { EmptyState } from "@/components/custom/EmptyState";

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
        await findSelfResumes({
          page: currentPage,
          size: itemsPerPage,
          filter: null
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
      await removeSelfResumeByJobId(jobId);
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
      await updateSelfResumeFile(resumeId, formData);
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
        <div className="mx-auto w-fit">
          <LoadingSpinner className="h-24 w-24" />
          <p className="my-2">Đang tải....</p>
        </div>
      ) : resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <EmptyState
              title="Chưa có hồ sơ nào"
              description="Bạn chưa nộp hồ sơ ứng tuyển nào"
              icon={<FileText className="mb-4 h-12 w-12 text-gray-400" />}
            />
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
