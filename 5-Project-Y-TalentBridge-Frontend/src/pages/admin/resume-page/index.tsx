import type { ResumeForDisplayResponseDto } from "@/types/resume";
import { useEffect, useState } from "react";
import { ResumeSearchSection } from "./ResumeSearchSection";
import Pagination from "@/components/custom/Pagination";
import { getResumes } from "@/services/resumeApi";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { toast } from "sonner";
import { ResumeTable } from "./ResumeTable";

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

      const res = (await getResumes({ page, size, filter })).data.data;
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

  console.log(resumes);

  return (
    <div className="space-y-6">
      <ResumeSearchSection
        searchCompanyName={searchCompanyName}
        setSearchCompanyName={setsearchCompanyName}
        searchJobName={searchJobName}
        setSearchJobName={setSearchJobName}
        onReset={() => {}}
      />

      {/* Header Section */}
      <h2 className="text-lg font-semibold">Danh sách hồ sơ xin việc</h2>

      <ResumeTable resumes={resumes} isLoading={isLoading} onEdit={() => {}} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
      />
    </div>
  );
};

export default ResumeManagerPage;
