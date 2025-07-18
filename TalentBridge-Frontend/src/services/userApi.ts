import axiosClient from "@/lib/axiosClient";
import type {
  SelfUserUpdatePasswordRequestDto,
  SelfUserUpdateProfileRequestDto,
} from "@/types/user.types";

export const selfUserProfileUpdateApi = (
  data: SelfUserUpdateProfileRequestDto,
) => {
  return axiosClient.post("/users/me", data);
};

export const selfUserPasswordUpdateApi = (
  data: SelfUserUpdatePasswordRequestDto,
) => {
  return axiosClient.post("/users/me/update-password", data);
};
