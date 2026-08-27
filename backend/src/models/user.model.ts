export type UserRecord = {
  id: number;
  username: string;
  email: string;
  jobRole: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  username: string;
  email: string;
  jobRole: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;
