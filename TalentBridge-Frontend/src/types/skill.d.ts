export interface createSkillRequestDto {
  name: string;
}

export interface updateSkillRequestDto {
  id: number;
  name: string;
}

export interface DefaultSkillResponseDto {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
