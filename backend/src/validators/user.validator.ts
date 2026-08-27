import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().trim().min(3, 'Username is required and must be at least 3 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  jobRole: z.enum(['tech', 'id', 'gd', 'qa']),
});

export const updateUserSchema = userSchema.partial();

export type UserInput = z.infer<typeof userSchema>;
