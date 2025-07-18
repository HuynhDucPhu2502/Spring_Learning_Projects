export interface UserSessionResponseDto {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  logoUrl: string;
}

export interface loginRequestDto {
  email: string;
  password: string;
}

export interface AuthTokenResponseDto {
  accessToken: string;
  user: UserSessionResponseDto;
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
