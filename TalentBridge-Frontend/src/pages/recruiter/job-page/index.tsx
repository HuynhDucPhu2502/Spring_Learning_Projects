import Pagination from "@/components/custom/Pagination";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { JobDetailsSidebar } from "@/pages/commons/job-manager-components/JobDetailsSidebar.tsx";
import { JobSearchSection } from "@/pages/commons/job-manager-components/JobSearchSection.tsx";
import { JobTable } from "@/pages/commons/job-manager-components/JobTable.tsx";
import {
  deleteJobByIdForRecruiterCompany,
  findAllJobsForRecruiterCompany,
} from "@/services/jobApi";
import type { Job } from "@/types/job";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JobManagerRecruiterPage = () => {
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
    searchLevel: string,
    searchLocation: string,
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchName) filters.push(`name ~ '*${searchName}*'`);
      if (searchLevel && searchLevel !== "all")
        filters.push(`level : '${searchLevel}'`);
      if (searchLocation) filters.push(`address ~ '*${searchLocation}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllJobsForRecruiterCompany({ page, size, filter }))
        .data.data;
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
      searchLevel,
      searchLocation,
    );
  }, [currentPage, itemsPerPage, searchName, searchLevel, searchLocation]);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchName("");
    setSearchLevel("all");
    setSearchLocation("");
    setIsExpandedSearch(false);

    fetchJobs(
      currentPage,
      itemsPerPage,
      searchName,
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
      await deleteJobByIdForRecruiterCompany(id);
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
    navigate(`/recruiter/jobs/upsert?id=${id}`);
  };

  return (
    <div className="space-y-6">
      <JobSearchSection
        searchName={searchName}
        searchLevel={searchLevel}
        searchLocation={searchLocation}
        isExpanded={isExpandedSearch}
        onReset={handleReset}
        onExpandToggle={() => setIsExpandedSearch(!isExpandedSearch)}
        onChange={{
          name: setSearchName,
          level: setSearchLevel,
          location: setSearchLocation,
        }}
      />

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách công việc</h2>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate("/recruiter/jobs/upsert")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <JobTable
        jobs={jobs}
        isLoading={isLoading}
        onEdit={handleOpenUpdatePage}
        onDelete={handleDelete}
        onView={(job) => handleOpenDetails(job)}
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

export default JobManagerRecruiterPage;
