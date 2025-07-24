import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import type {
  MemberRecruiterRequestDto,
  RecruiterInfoResponseDto,
} from "@/types/user";

export const saveCompany = (formData: FormData) => {
  return axiosClient.post("/companies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const saveSelfCompany = (formData: FormData) => {
  return axiosClient.post("/companies/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const findAllCompanies = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<
    ApiResponse<PageResponseDto<DefaultCompanyResponseDto>>
  >(`/companies?${params.toString()}`);
};

export const findAllCompaniesWithJobsCount = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<
    ApiResponse<PageResponseDto<DefaultCompanyResponseDto>>
  >(`/companies/with-jobs-count?${params.toString()}`);
};

export const findCompanyById = (id: number) => {
  return axiosClient.get<ApiResponse<DefaultCompanyResponseDto>>(
    `/companies/${id}`,
  );
};

export const findSelfCompany = () => {
  return axiosClient.get<ApiResponse<DefaultCompanyResponseDto>>(
    `/companies/me`,
  );
};

export const findAllRecruitersBySelfCompany = () => {
  return axiosClient.get<ApiResponse<RecruiterInfoResponseDto[]>>(
    `/companies/me/users`,
  );
};

export const updateCompanyById = (formData: FormData, id: number) => {
  return axiosClient.put(`/companies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateSelfCompany = (formData: FormData) => {
  return axiosClient.put(`/companies/me`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCompanyById = (id: number) => {
  if (!id) return null;

  return axiosClient.delete(`/companies/${id}`);
};

export const addMemberToCompany = (data: MemberRecruiterRequestDto) => {
  return axiosClient.post(`/companies/me/users`, data);
};

export const removeMemberFromCompany = (data: MemberRecruiterRequestDto) => {
  return axiosClient.put(`/companies/me/users`, data);
};
