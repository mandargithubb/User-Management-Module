export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  jobRole: 'tech' | 'id' | 'gd' | 'qa';
  createdAt?: string;
  updatedAt?: string;
}
