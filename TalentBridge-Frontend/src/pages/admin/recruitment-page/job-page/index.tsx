import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import type { Job } from "@/types/job";
import { JobSearchSection } from "../../../commons/job-manager-components/JobSearchSection.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { deleteJobById, findAllJobs } from "@/services/jobApi";
import Pagination from "@/components/custom/Pagination";

import { JobDetailsSidebar } from "../../../commons/job-manager-components/JobDetailsSidebar.tsx";
import { JobTable } from "../../../commons/job-manager-components/JobTable.tsx";
import HasPermission from "@/pages/commons/HasPermission.tsx";

const JobManagerPage = () => {
  const navigate = useNavigate();

  // ============================
  // Data
  // ============================
  const [jobs, setJobs] = useState<Job[]>([]);
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
  const [isExpandedSearch, setIsExpandedSearch] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchCompanyName, setsearchCompanyName] = useState("");
  const [searchLevel, setSearchLevel] = useState("all");
  const [searchLocation, setSearchLocation] = useState("");

  // ============================
  // View Details State
  // ============================
  const [hoveredJob, setHoveredJob] = useState<Job | null>(null);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);

  const handleOpenDetails = (job: Job) => {
    setHoveredJob(job);
    setShowDetailsSidebar(true);
  };

  const handleCloseDetails = () => {
    setHoveredJob(null);
    setShowDetailsSidebar(false);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchJobs = async (
    page: number,
    size: number,
    searchName: string,
    searchCompanyName: string,
    searchLevel: string,
    searchLocation: string,
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchName) filters.push(`name ~ '*${searchName}*'`);
      if (searchCompanyName)
        filters.push(`company.name ~ '*${searchCompanyName}*'`);
      if (searchLevel && searchLevel !== "all")
        filters.push(`level : '${searchLevel}'`);
      if (searchLocation) filters.push(`address ~ '*${searchLocation}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllJobs({ page, size, filter })).data.data;
      setJobs(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(
      currentPage,
      itemsPerPage,
      searchName,
      searchCompanyName,
      searchLevel,
      searchLocation,
    );
  }, [
    currentPage,
    itemsPerPage,
    searchName,
    searchCompanyName,
    searchLevel,
    searchLocation,
  ]);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchName("");
    setsearchCompanyName("");
    setSearchLevel("all");
    setSearchLocation("");
    setIsExpandedSearch(false);

    fetchJobs(
      currentPage,
      itemsPerPage,
      searchName,
      searchCompanyName,
      searchLevel,
      searchLocation,
    );
  };

  // ============================
  // HANDLE DELETE
  // ============================
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteJobById(id);
      toast.success("Xóa công ty thành công");

      if (hoveredJob?.id === id) handleCloseDetails();
      handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa công ty thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // HANDLE OPEN UPDATE page
  // ============================
  const handleOpenUpdatePage = async (id: number) => {
    navigate(`/admin/recruitment/job-manager/upsert?id=${id}`);
  };

  return (
    <div className="space-y-6">
      <JobSearchSection
        searchName={searchName}
        searchCompanyName={searchCompanyName}
        searchLevel={searchLevel}
        searchLocation={searchLocation}
        isExpanded={isExpandedSearch}
        onReset={handleReset}
        onExpandToggle={() => setIsExpandedSearch(!isExpandedSearch)}
        onChange={{
          name: setSearchName,
          company: setsearchCompanyName,
          level: setSearchLevel,
          location: setSearchLocation,
        }}
      />

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách công việc</h2>
        <HasPermission perm={"POST /jobs"}>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/admin/recruitment/job-manager/upsert")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </HasPermission>
      </div>

      <JobTable
        jobs={jobs}
        isLoading={isLoading}
        onEdit={handleOpenUpdatePage}
        onDelete={handleDelete}
        onView={(job) => handleOpenDetails(job)}
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

      {hoveredJob && (
        <JobDetailsSidebar
          job={hoveredJob}
          isOpen={showDetailsSidebar}
          onClose={handleCloseDetails}
          onEdit={(job) => handleOpenUpdatePage(job.id)}
          onDelete={(id) => handleDelete(id)}
        />
      )}
    </div>
  );
};

export default JobManagerPage;
