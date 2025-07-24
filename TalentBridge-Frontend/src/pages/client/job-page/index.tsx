import { useState, useEffect } from "react";
import type { Job } from "@/types/job";
import JobGrid from "./JobGrid";
import { JobSearchSection } from "./JobSearchSection";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { findAllJobs } from "@/services/jobApi";
import { toast } from "sonner";
import Pagination from "@/components/custom/Pagination";

export default function JobClientPage() {
  // ============================
  // Data
  // ============================
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 px-4 py-16">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h1 className="mb-4 text-5xl font-bold text-white">Việc làm</h1>
            <p className="mx-auto max-w-2xl text-xl text-orange-100">
              Khám phá hàng nghìn cơ hội việc làm chất lượng cao
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2000+</div>
              <div className="text-sm text-orange-200">Việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-orange-200">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-sm text-orange-200">Ứng viên</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-4/5">
        {/* Search Section */}
        <div className="my-12">
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
          <div className="mt-4 text-center text-sm text-gray-500">
            Tìm thấy {jobs.length} việc làm
          </div>
        </div>

        <JobGrid isLoading={isLoading} jobs={jobs} />

        <div className="my-12">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showItemsPerPageSelect={false}
          />
        </div>
      </div>
    </div>
  );
}
