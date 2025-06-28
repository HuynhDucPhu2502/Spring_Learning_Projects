import axiosClient from "@/lib/axiosClient";
import type {
  ApiResponse,
  PageResponseDto,
  PaginationParams,
} from "@/types/apiResponse";
import type {
  createSkillRequestDto,
  Skill,
  updateSkillRequestDto,
} from "@/types/skill";

export const saveSkill = (data: createSkillRequestDto) => {
  return axiosClient.post<ApiResponse<Skill>>(
    "http://localhost:8080/skills",
    data
  );
};

export const getSkillsList = ({
  page = 0,
  size = 5,
  filter,
}: PaginationParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filter) params.append("filter", filter);

  return axiosClient.get<ApiResponse<PageResponseDto<Skill>>>(
    `http://localhost:8080/skills?${params.toString()}`
  );
};

export const updateSkill = (data: updateSkillRequestDto) => {
  return axiosClient.put<ApiResponse<PageResponseDto<Skill>>>(
    "http://localhost:8080/skills",
    data
  );
};

export const deleteSkillById = (id: number) => {
  return axiosClient.delete<ApiResponse<PageResponseDto<Skill>>>(
    `http://localhost:8080/skills/${id}`
  );
};
