import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type {
  DefaultUserResponseDto,
  SelfUserUpdatePasswordRequestDto,
  SelfUserUpdateProfileRequestDto,
  UserCreateRequestDto,
  UserUpdateRequestDto,
} from "@/types/user";

export const getUserList = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<DefaultUserResponseDto>>>(
    `/users?${params.toString()}`,
  );
};

export const saveUser = (data: UserCreateRequestDto) => {
  return axiosClient.post<ApiResponse<DefaultUserResponseDto>>("/users", data);
};

export const updateUser = (data: UserUpdateRequestDto) => {
  return axiosClient.put<ApiResponse<DefaultUserResponseDto>>("/users", data);
};

export const getUserById = (id: number) => {
  return axiosClient.get<ApiResponse<DefaultUserResponseDto>>(`/users/${id}`);
};

export const deleteUserById = (id: number) => {
  return axiosClient.delete<ApiResponse<DefaultUserResponseDto>>(
    `/users/${id}`,
  );
};

export const selfUserProfileUpdateApi = (
  data: SelfUserUpdateProfileRequestDto,
) => {
  return axiosClient.post("/users/me/update-profile", data);
};

export const selfUserPasswordUpdateApi = (
  data: SelfUserUpdatePasswordRequestDto,
) => {
  return axiosClient.post("/users/me/update-password", data);
};

export const selfUserAvatarUpdateApi = (data: FormData) => {
  return axiosClient.post("/users/me/upload-avatar", data);
};
