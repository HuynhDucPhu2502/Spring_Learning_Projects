import type { SkillSummary } from "./job";

// =============================
// MAIN INTERFACE
// =============================

export interface DefaultSubscriberRequestDto {
  skills: skillId[];
}

export interface DefaultSubscriberResponseDto {
  id: number;
  email: string;
  skills: SkillSummary[];
}

// =============================
// SECONDARY INTERFACE
// =============================
export interface SkillId {
  id: number;
}
