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
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: PermissionForRole[];
}

export interface RoleSummary {
  id: number;
  name: string;
  description: string;
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
