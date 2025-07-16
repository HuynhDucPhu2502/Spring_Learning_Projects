import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.types.ts";
import type { Job, JobUpsertDto } from "@/types/job";

export const saveJob = (data: JobUpsertDto) => {
  return axiosClient.post("/jobs", data);
};

export const updateJobById = (id: number, data: JobUpsertDto) => {
  return axiosClient.put(`/jobs/${id}`, data);
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
    `/jobs?${params.toString()}`,
  );
};

export const getJobById = (id: number) => {
  return axiosClient.get<ApiResponse<Job>>(`/jobs/${id}`);
};

export const getJobByCompanyId = (id: number) => {
  return axiosClient.get<ApiResponse<Job[]>>(`/jobs/companies/${id}`);
};

export const deleteJobById = (id: number) => {
  return axiosClient.delete(`/jobs/${id}`);
};
