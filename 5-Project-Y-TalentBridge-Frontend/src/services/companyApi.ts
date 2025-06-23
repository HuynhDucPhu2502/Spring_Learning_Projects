import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type { Company, CreateAndUpdateRequestDto } from "@/types/company";

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

  return axiosClient.get<ApiResponse<PageResponseDto<Company>>>(
    `http://localhost:8080/companies?${params.toString()}`
  );
};

export const deleteCompanyById = (id: number) => {
  if (!id) return null;

  return axiosClient.delete(`http://localhost:8080/companies/${id}`);
};

export const addCompany = (data: CreateAndUpdateRequestDto) => {
  if (!data) return null;

  return axiosClient.post(`http://localhost:8080/companies`, data);
};

export const updateCompanyById = (
  data: CreateAndUpdateRequestDto,
  id: number
) => {
  if (!data) return null;

  return axiosClient.put(`http://localhost:8080/companies/${id}`, data);
};
