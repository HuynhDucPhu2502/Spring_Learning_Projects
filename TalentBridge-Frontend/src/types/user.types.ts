export interface AuthTokenResponseDto {
  accessToken: string;
  user: UserSessionResponseDto;
}

export interface UserSessionResponseDto {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  logoUrl: string;
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
