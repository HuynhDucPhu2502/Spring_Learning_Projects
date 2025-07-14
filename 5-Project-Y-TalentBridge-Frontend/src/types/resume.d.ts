
// =============================
// MAIN INTERFACE
// =============================
export interface CreateResumeRequestDto {
  email: string;
  status: string;
  user: {
    id: number;
  };
  job: {
    id: number;
  };
}

export interface ResumeForDisplayResponseDto {
  id: number;
  status: string;
  pdfUrl: string;
  user: UserForResume;
  job: JobForResume;
  company: CompanyForResume;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateResumeStatusRequestDto {
  id: number;
  status: string;
}

// =============================
// SECONDARY INTERFACE
// =============================
export interface UserForResume {
  id: number;
  email: string;
}

export interface JobForResume {
  id: number;
  name: string;
  location: string;
  skills: string[];
  level: "INTERN" | "FRESHER" | "MIDDLE" | "SENIOR";
  description: string;
}

export interface CompanyForResume {
  id: number;
  name: string;
  logoUrl: string;
}
