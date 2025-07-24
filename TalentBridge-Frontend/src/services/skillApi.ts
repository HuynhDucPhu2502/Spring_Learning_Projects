import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse.d.ts";
import type {
  createSkillRequestDto,
  DefaultSkillResponseDto,
  updateSkillRequestDto,
} from "@/types/skill.d.ts";

export const saveSkill = (data: createSkillRequestDto) => {
  return axiosClient.post<ApiResponse<DefaultSkillResponseDto>>("/skills", data);
};

export const findAllSkills = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<DefaultSkillResponseDto>>>(
    `/skills?${params.toString()}`,
  );
};

export const updateSkill = (data: updateSkillRequestDto) => {
  return axiosClient.put<ApiResponse<PageResponseDto<DefaultSkillResponseDto>>>("/skills", data);
};

export const deleteSkillById = (id: number) => {
  return axiosClient.delete<ApiResponse<PageResponseDto<DefaultSkillResponseDto>>>(
    `/skills/${id}`,
  );
};
