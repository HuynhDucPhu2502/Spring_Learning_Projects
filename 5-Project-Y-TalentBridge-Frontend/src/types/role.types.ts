
// =============================
// MAIN INTERFACE
// =============================
export interface DefaultRoleRequestDto {
  name: string;
  description: string;
  active: boolean;
  permissions: PermissionIdForRole[];
}

export interface DefaultRoleResponseDto {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: PermissionForRole[];
}


// =============================
// SECOND INTERFACE
// =============================
export interface PermissionIdForRole {
  id: number;
}

export interface PermissionForRole {
  id: number;
  name: string;
  apiPath: string;
  method: string;
  module: string;
}