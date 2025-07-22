import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import type {
  ResumeForDisplayResponseDto,
  UpdateResumeStatusRequestDto,
} from "@/types/resume";

export const saveResume = (formData: FormData) => {
  return axiosClient.post("/resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const findAllResumes = ({
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

export const findAllResumesForRecruiterCompany = ({
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
  >(`/resumes/company?${params.toString()}`);
};

export const findSelfResumes = ({ page = 0, size = 3 }: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  return axiosClient.get<
    ApiResponse<PageResponseDto<ResumeForDisplayResponseDto>>
  >(`/resumes/me?${params.toString()}`);
};

export const removeSelfResumeByJobId = (jobId: number) => {
  return axiosClient.delete(`/resumes/me/jobs/${jobId}`);
};

export const updateSelfResumeFile = (resumeId: number, formData: FormData) => {
  return axiosClient.put<ApiResponse<ResumeForDisplayResponseDto>>(
    `/resumes/me/file/${resumeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const updateResumeStatus = (resume: UpdateResumeStatusRequestDto) => {
  return axiosClient.put(`/resumes/status`, resume);
};

export const updateResumeStatusForRecruiterCompany = (resume: UpdateResumeStatusRequestDto) => {
  return axiosClient.put(`/resumes/company/status`, resume);
};

