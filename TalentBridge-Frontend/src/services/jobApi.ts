import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import type { Job, JobUpsertDto } from "@/types/job";

export const saveJob = (data: JobUpsertDto) => {
  return axiosClient.post("/jobs", data);
};

export const saveJobForRecruiterPage = (data: JobUpsertDto) => {
  return axiosClient.post("/jobs/company", data);
};

export const findAllJobs = ({
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

export const findJobById = (id: number) => {
  return axiosClient.get<ApiResponse<Job>>(`/jobs/${id}`);
};

export const findJobByCompanyId = (id: number) => {
  return axiosClient.get<ApiResponse<Job[]>>(`/jobs/companies/${id}`);
};

export const findAllJobsForRecruiterCompany = ({
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
    `/jobs/company?${params.toString()}`,
  );
};

export const updateJobById = (id: number, data: JobUpsertDto) => {
  return axiosClient.put(`/jobs/${id}`, data);
};

export const updateJobByIdForRecruiterCompany = (
  id: number,
  data: JobUpsertDto,
) => {
  return axiosClient.put(`/jobs/company/${id}`, data);
};

export const deleteJobById = (id: number) => {
  return axiosClient.delete(`/jobs/${id}`);
};

export const deleteJobByIdForRecruiterCompany = (id: number) => {
  return axiosClient.delete(`/jobs/company/${id}`);
};
