export interface User {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface loginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
