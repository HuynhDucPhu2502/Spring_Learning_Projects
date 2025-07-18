import axiosClient from "@/lib/axiosClient";
import type {
  SelfUserUpdatePasswordRequestDto,
  SelfUserUpdateProfileRequestDto,
} from "@/types/user.types";

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
