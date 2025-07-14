export interface DefaultCompanyResponseDto {
  id: number;
  name: string;
  description: string;
  address: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
  jobsCount?: number;
}

export interface CreateAndUpdateRequestDto {
  name: string;
  description: string;
  address: string;
}
