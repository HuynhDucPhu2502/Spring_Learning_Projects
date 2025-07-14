import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.types.ts";
import type { DefaultCompanyResponseDto } from "@/types/company.types.ts";

export const getCompaniesList = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<DefaultCompanyResponseDto>>>(
    `/companies?${params.toString()}`,
  );
};

export const getCompaniesListWithJobsCount = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<DefaultCompanyResponseDto>>>(
    `/companies/with-jobs-count?${params.toString()}`,
  );
};

export const getCompanyById = (id: number) => {
  return axiosClient.get<ApiResponse<DefaultCompanyResponseDto>>(`/companies/${id}`);
};

export const deleteCompanyById = (id: number) => {
  if (!id) return null;

  return axiosClient.delete(`/companies/${id}`);
};

export const addCompany = (formData: FormData) => {
  return axiosClient.post("/companies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCompanyById = (formData: FormData, id: number) => {
  return axiosClient.put(`/companies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
