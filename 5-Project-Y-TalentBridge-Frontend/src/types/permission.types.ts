export interface DefaultPermissionRequestDto {
  name: string;
  apiPath: string;
  method: string;
  module: string;
}

export interface DefaultPermissionResponseDto {
  id: number;
  name: string;
  apiPath: string;
  method: string;
  module: string;
  createdAt: string;
  updatedAt: string;
}
