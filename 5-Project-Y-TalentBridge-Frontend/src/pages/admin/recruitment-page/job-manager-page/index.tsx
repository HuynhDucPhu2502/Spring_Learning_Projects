"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Briefcase } from "lucide-react";
import type { Job } from "@/types/job";
import { JobSearchSection } from "./JobSearchSection";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { deleteJobById, getJobsList } from "@/services/jobApi";
import Pagination from "@/components/custom/Pagination";
import { EmptyState } from "@/components/custom/EmptyState";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import { formatISO } from "@/utils/convertHelper";

export function JobManagerPanel() {
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

      const res = (await getJobsList({ page, size, filter })).data.data;
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
  // HANDLE DISPLAY STATUS AND LEVEL BADGE
  // ============================
  const getStatusBadge = (active: boolean) => {
    const status = active ? "Active" : "Inactive";
    const variants = {
      Active: "default",
      Inactive: "secondary",
      Draft: "outline",
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getLevelBadge = (level: Job["level"]) => {
    const colors = {
      INTERN: "bg-gray-100 text-gray-800",
      FRESHER: "bg-green-100 text-green-800",
      MIDDLE: "bg-yellow-100 text-yellow-800",
      SENIOR: "bg-orange-100 text-orange-800",
    };

    return <Badge className={colors[level]}>{level}</Badge>;
  };

  // ============================
  // HANDLE DELETE
  // ============================
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteJobById(id);
      toast.success("Xóa công ty thành công");
      handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa công ty thất bại"));
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="text-lg font-semibold">Danh sách Jobs</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/recruitment/job-manager/upsert")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-lg border border-blue-600">
        <Table>
          <TableHeader className="bg-blue-600 text-white">
            <TableRow>
              <TableHead className="text-center font-bold text-white">
                ID
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Tên Công việc
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Công ty
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Trình độ
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Trạng thái
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Ngày tạo
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Ngày kết thúc
              </TableHead>
              <TableHead className="text-center font-bold text-white">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState
                    title="Không tìm thấy công ty nào"
                    description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới"
                    icon={
                      <Briefcase className="text-muted-foreground h-12 w-12" />
                    }
                  />
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              jobs.length > 0 &&
              jobs.map((job, index) => (
                <TableRow key={job.id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {job.name}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {job.company.name}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {getLevelBadge(job.level)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {getStatusBadge(job.active)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {formatISO(job.startDate)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {formatISO(job.endDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4 text-orange-500" />
                      </Button>
                      <DeleteConfirmDialog
                        onConfirm={() => handleDelete(job.id)}
                        title="Bạn có chắc muốn xóa công việc này?"
                        description="Hành động này sẽ xóa công việc khỏi hệ thống và không thể hoàn tác."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

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
}
