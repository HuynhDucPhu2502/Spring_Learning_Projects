import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type { Company } from "@/types/company";

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
