export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

export interface User {
  id: number;
  username: string;
  email: string;
  jobRole: JobRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  jobRole: JobRole;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}
