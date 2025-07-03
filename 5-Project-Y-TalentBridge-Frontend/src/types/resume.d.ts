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
