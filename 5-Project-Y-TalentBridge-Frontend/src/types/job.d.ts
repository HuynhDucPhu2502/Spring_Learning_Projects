
// =============================
// MAIN INTERFACE
// =============================
export interface Job {
  id: number;
  name: string;
  location: string;
  salary: number;
  quantity: number;
  level: "INTERN" | "FRESHER" | "MIDDLE" | "SENIOR";
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  company: CompanySummary;
  skills: SkillSummary[];
}

export interface JobUpsertDto {
  name: string;
  location: string;
  salary: number;
  quantity: number;
  level: "INTERN" | "FRESHER" | "MIDDLE" | "SENIOR";
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  company: {
    id: number;
  } | null;
  skills: {
    id: number;
  }[];
}

// =============================
// SECONDARY INTERFACE
// =============================
export interface CompanySummary {
  id: number;
  name: string;
  address: string;
  logoUrl?: string;
}

export interface SkillSummary {
  id: number;
  name: string;
}
