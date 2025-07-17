export interface UserSessionResponseDto {
  id: string;
  name: string;
  email: string;
  permissions: string[];
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
  age: number;
  address: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}
