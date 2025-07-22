import type {
  ResumeForDisplayResponseDto,
  UpdateResumeStatusRequestDto,
} from "@/types/resume";
import { useEffect, useState } from "react";
import { ResumeSearchSection } from "../../commons/resume-manager-components/ResumeSearchSection.tsx";
import Pagination from "@/components/custom/Pagination";
import {
  findAllResumesForRecruiterCompany,
  updateResumeStatusForRecruiterCompany
} from "@/services/resumeApi";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { ResumeTable } from "../../commons/resume-manager-components/ResumeTable.tsx";
import { ViewResumeDialog } from "../../commons/resume-manager-components/ViewResumeDialog.tsx";

const ResumeManagerRecruiterPage = () => {
  // ============================
  // Data
  // ============================
  const [resumes, setResumes] = useState<ResumeForDisplayResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ============================
  // Search State
  // ============================
  const [searchJobName, setSearchJobName] = useState("");

  // ============================
  // Dialog State
  // ============================
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] =
    useState<ResumeForDisplayResponseDto | null>(null);

  const handleViewResumeDialog = (resume: ResumeForDisplayResponseDto) => {
    setSelectedResume(resume);
    setisDialogOpen(true);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchResumes = async (
    page: number,
    size: number,
    searchJobName: string,
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchJobName) filters.push(`job.name ~ '*${searchJobName}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (
        await findAllResumesForRecruiterCompany({ page, size, filter })
      ).data.data;
      setResumes(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes(currentPage, itemsPerPage, searchJobName);
  }, [currentPage, itemsPerPage, searchJobName]);

  useEffect(() => {
    fetchResumes(1, itemsPerPage, searchJobName);
    setCurrentPage(1);
  }, [itemsPerPage, searchJobName]);

  // ============================
  // HANDLE UPDATE RESUME STATUS
  // ============================
  const handleUpdateResumeStatus = async (
    resume: UpdateResumeStatusRequestDto,
  ) => {
    setIsLoading(true);
    try {
      await updateResumeStatusForRecruiterCompany(resume);
      await fetchResumes(currentPage, itemsPerPage, searchJobName);
      toast.success("Cập nhật trạng thái hồ sơ thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Cập nhật trạng thái hồ sơ thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchJobName("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <ResumeSearchSection
        onReset={handleReset}
        searchJobName={searchJobName}
        setSearchJobName={setSearchJobName}
        isRecruiter={true}
      />

      {/* Header Section */}
      <h2 className="text-lg font-semibold">Danh sách hồ sơ xin việc</h2>

      <ResumeTable
        resumes={resumes}
        isLoading={isLoading}
        onViewResumePDF={handleViewResumeDialog}
        theme={"purple"}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
        theme={"purple"}
      />

      <ViewResumeDialog
        open={isDialogOpen}
        onOpenChange={setisDialogOpen}
        onUpdate={handleUpdateResumeStatus}
        resume={selectedResume ?? ({} as ResumeForDisplayResponseDto)}
        onCloseForm={() => setSelectedResume(null)}
        theme={"purple"}
      />
    </div>
  );
};

export default ResumeManagerRecruiterPage;
