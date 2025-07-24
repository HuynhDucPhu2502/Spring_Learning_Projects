import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import type {
  DefaultPermissionRequestDto,
  DefaultPermissionResponseDto,
} from "@/types/permission.d.ts";

export const savePermission = (data: DefaultPermissionRequestDto) => {
  return axiosClient.post<ApiResponse<DefaultPermissionRequestDto>>(
    "/permissions",
    data,
  );
};

export const findAllPermissions = ({
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
    ApiResponse<PageResponseDto<DefaultPermissionResponseDto>>
  >(`/permissions?${params.toString()}`);
};

export const findAllPermissionsNoPaging = () => {
  return axiosClient.get<ApiResponse<DefaultPermissionResponseDto[]>>(
    "/permissions/all",
  );
};

export const updatePermissionById = (
  id: number,
  data: DefaultPermissionRequestDto,
) => {
  return axiosClient.put<ApiResponse<DefaultPermissionRequestDto>>(
    `/permissions/${id}`,
    data,
  );
};

export const deletePermissionById = (id: number) => {
  return axiosClient.delete<ApiResponse<DefaultPermissionRequestDto>>(
    `/permissions/${id}`,
  );
};
