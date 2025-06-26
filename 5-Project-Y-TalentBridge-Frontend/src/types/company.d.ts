export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAndUpdateRequestDto {
  name: string;
  description: string;
  address: string;
}
