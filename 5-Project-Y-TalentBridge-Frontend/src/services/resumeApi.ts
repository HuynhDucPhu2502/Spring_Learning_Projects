import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type { ResumeForDisplayResponseDto } from "@/types/resume";

export const saveResume = (formData: FormData) => {
  return axiosClient.post("/resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getResumsByUserId = ({
  page = 0,
  size = 3,
  userId,
}: PaginationParams & { userId: string }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  return axiosClient.get<
    ApiResponse<PageResponseDto<ResumeForDisplayResponseDto>>
  >(`http://localhost:8080/resumes/user/${userId}?${params.toString()}`);
};

export const removeResumeByUserIdAndJobId = (userId: number, jobId: number) => {
  return axiosClient.delete(`/resumes/users/${userId}/jobs/${jobId}`);
};

export const updateResumeFileByResumeId = (
  resumeId: number,
  formData: FormData,
) => {
  return axiosClient.put<ApiResponse<ResumeForDisplayResponseDto>>(
    `/resumes/file/${resumeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const getResumes = ({
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
    ApiResponse<PageResponseDto<ResumeForDisplayResponseDto>>
  >(`/resumes?${params.toString()}`);
};
