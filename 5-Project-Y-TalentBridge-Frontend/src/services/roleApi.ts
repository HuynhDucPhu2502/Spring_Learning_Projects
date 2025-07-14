import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.types.ts";
import axiosClient from "@/lib/axiosClient.ts";
import type { DefaultRoleResponseDto } from "@/types/role.types.ts";

export const getRolesList = ({
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
