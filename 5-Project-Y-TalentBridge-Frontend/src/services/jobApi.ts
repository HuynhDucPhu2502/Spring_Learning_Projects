import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type { Job, JobUpsertDto } from "@/types/job";

export const saveJob = (data: JobUpsertDto) => {
  return axiosClient.post("http://localhost:8080/jobs", data);
};

export const updateJobById = (id: number, data: JobUpsertDto) => {
  return axiosClient.put(`http://localhost:8080/jobs/${id}`, data);
};

export const getJobsList = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<Job>>>(
    `http://localhost:8080/jobs?${params.toString()}`,
  );
};

export const getJobById = (id: number) => {
  return axiosClient.get<ApiResponse<Job>>(`http://localhost:8080/jobs/${id}`);
};

export const get3RecentJobByCompanyId = (id: number) => {
  return axiosClient.get<ApiResponse<Job[]>>(
    `http://localhost:8080/jobs/company/${id}`,
  );
};

export const deleteJobById = (id: number) => {
  return axiosClient.delete(`http://localhost:8080/jobs/${id}`);
};
