import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import axiosClient from "@/lib/axiosClient.ts";
import type {
  DefaultRoleRequestDto,
  DefaultRoleResponseDto,
} from "@/types/role.d.ts";

export const saveRole = (data: DefaultRoleRequestDto) => {
  return axiosClient.post<ApiResponse<DefaultRoleResponseDto>>("/roles", data);
};

export const findAllRoles = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<DefaultRoleResponseDto>>>(
    `/roles?${params.toString()}`,
  );
};

export const updateRoleById = (id: number, data: DefaultRoleRequestDto) => {
  return axiosClient.put<ApiResponse<DefaultRoleResponseDto>>(
    `/roles/${id}`,
    data,
  );
};

export const deleteRoleById = (id: number) => {
  return axiosClient.delete(`/roles/${id}`);
};
