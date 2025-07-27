// =============================
// MAIN INTERFACE
// =============================
export interface AuthTokenResponseDto {
  accessToken: string;
  user: UserSessionResponseDto;
}

export interface UserSessionResponseDto {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  role: string;
  companyId: string;
  logoUrl: string;
  updatedAt: string;
}

export interface UserDetailsResponseDto {
  id: number;
  name: string;
  email: string;
  dob: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface DefaultUserResponseDto {
  id: number;
  name: string;
  email: string;
  dob: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  logoUrl: string;
  company: CompanyForUser;
  role: RoleForUser;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateRequestDto {
  name: string;
  email: string;
  password: string;
  dob: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  company: CompanyIdForUser | null;
  role: RoleIdForUser | null;
}

export interface UserUpdateRequestDto {
  id: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  address: string;
  company: CompanyIdForUser | null;
  role: RoleIdForUser | null;
}

export interface SessionMetaRequest {
  deviceName: string;
  deviceType: string;
  userAgent: string;
}

export interface SessionMetaResponse {
  sessionId: string;
  deviceName: string;
  deviceType: string;
  userAgent: string;
  loginAt: string;
  current: boolean;
}

export interface UserLoginRequestDto {
  email: string;
  password: string;
  sessionMetaRequest: SessionMetaRequest | null;
}

export interface UserRegisterRequestDto {
  name: string;
  email: string;
  password: string;
  dob: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  recruiter: boolean;
}

export interface SelfUserUpdateProfileRequestDto {
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  address: string;
}

export interface SelfUserUpdatePasswordRequestDto {
  oldPassword: string;
  newPassword: string;
}

export interface RecruiterInfoResponseDto {
  id: number;
  name: string;
  email: string;
  owner: boolean;
}

export interface MemberRecruiterRequestDto {
  email: string;
}

// =============================
// SECONDARY INTERFACE
// =============================
export interface CompanyForUser {
  id: number;
  name: string;
  address: string;
  logoUrl: string;
}

export interface RoleForUser {
  id: number;
  name: string;
  description: string;
}

export interface CompanyIdForUser {
  id: number;
}

export interface RoleIdForUser {
  id: number;
}
