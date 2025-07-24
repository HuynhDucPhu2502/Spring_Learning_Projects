import axiosClient from "@/lib/axiosClient";
import type { ApiResponse } from "@/types/apiResponse";
import type {
  DefaultSubscriberRequestDto,
  DefaultSubscriberResponseDto,
} from "@/types/subscriber";

export const saveSelfSubscriber = (data: DefaultSubscriberRequestDto) => {
  return axiosClient.post<ApiResponse<DefaultSubscriberResponseDto | null>>(
    "/subscribers/me",
    data,
  );
};

export const findSelfSubscriber = () => {
  return axiosClient.get<ApiResponse<DefaultSubscriberResponseDto | null>>(
    "/subscribers/me",
  );
};

export const updateSelfSubscriber = (data: DefaultSubscriberRequestDto) => {
  return axiosClient.put<ApiResponse<DefaultSubscriberResponseDto | null>>(
    "/subscribers/me",
    data,
  );
};

export const deleteSelfSubscriber = () => {
  return axiosClient.delete("/subscribers/me");
};
