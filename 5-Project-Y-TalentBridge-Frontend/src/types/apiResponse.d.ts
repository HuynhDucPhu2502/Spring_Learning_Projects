export interface ApiResponse<T> {
  message: string;
  errorCode: string;
  data: T;
}

export interface PageResponseDto<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface PaginationParams {
  page: number;
  size: number;
  filter: string | null;
}
