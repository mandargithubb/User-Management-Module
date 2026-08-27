export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

export interface User {
  id: number;
  username: string;
  email: string;
  jobRole: JobRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
