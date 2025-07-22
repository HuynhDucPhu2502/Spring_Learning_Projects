import type {
  ResumeForDisplayResponseDto,
  UpdateResumeStatusRequestDto,
} from "@/types/resume";
import { useEffect, useState } from "react";
import { ResumeSearchSection } from "../../../commons/resume-manager-components/ResumeSearchSection.tsx";
import Pagination from "@/components/custom/Pagination.tsx";
import { findAllResumes, updateResumeStatus } from "@/services/resumeApi.ts";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import { toast } from "sonner";
import { ResumeTable } from "../../../commons/resume-manager-components/ResumeTable.tsx";
import { ViewResumeDialog } from "../../../commons/resume-manager-components/ViewResumeDialog.tsx";

const ResumeManagerPage = () => {
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
  const [searchCompanyName, setsearchCompanyName] = useState("");
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
    searchCompanyName: string,
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchJobName) filters.push(`job.name ~ '*${searchJobName}*'`);
      if (searchCompanyName)
        filters.push(`job.company.name ~ '*${searchCompanyName}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllResumes({ page, size, filter })).data.data;
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
    fetchResumes(currentPage, itemsPerPage, searchJobName, searchCompanyName);
  }, [currentPage, itemsPerPage, searchJobName, searchCompanyName]);

  useEffect(() => {
    fetchResumes(1, itemsPerPage, searchJobName, searchCompanyName);
    setCurrentPage(1);
  }, [itemsPerPage, searchJobName, searchCompanyName]);

  // ============================
  // HANDLE UPDATE RESUME STATUS
  // ============================
  const handleUpdateResumeStatus = async (
    resume: UpdateResumeStatusRequestDto,
  ) => {
    setIsLoading(true);
    try {
      await updateResumeStatus(resume);
      await fetchResumes(
        currentPage,
        itemsPerPage,
        searchJobName,
        searchCompanyName,
      );
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
    setsearchCompanyName("");
    setSearchJobName("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <ResumeSearchSection
        searchCompanyName={searchCompanyName}
        setSearchCompanyName={setsearchCompanyName}
        searchJobName={searchJobName}
        setSearchJobName={setSearchJobName}
        onReset={handleReset}
      />

      {/* Header Section */}
      <h2 className="text-lg font-semibold">Danh sách hồ sơ xin việc</h2>

      <ResumeTable
        resumes={resumes}
        isLoading={isLoading}
        onViewResumePDF={handleViewResumeDialog}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
      />

      <ViewResumeDialog
        open={isDialogOpen}
        onOpenChange={setisDialogOpen}
        onUpdate={handleUpdateResumeStatus}
        resume={selectedResume ?? ({} as ResumeForDisplayResponseDto)}
        onCloseForm={() => setSelectedResume(null)}
      />
    </div>
  );
};

export default ResumeManagerPage;
