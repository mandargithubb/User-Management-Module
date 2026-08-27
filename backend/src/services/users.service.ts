import { prisma } from '../config/database.js';
import { CreateUserInput, UpdateUserInput, UserRecord } from '../models/user.model.js';
import { usersRepository } from '../repositories/users.repository.js';

export const usersService = {
  async getAllUsers(): Promise<UserRecord[]> {
    return usersRepository.findAll();
  },

  async getUserById(id: number): Promise<UserRecord> {
    const user = await usersRepository.findById(id);

    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number; code?: string }).statusCode = 404;
      (error as Error & { statusCode?: number; code?: string }).code = 'USER_NOT_FOUND';
      throw error;
    }

    return user;
  },

  async createUser(data: CreateUserInput): Promise<UserRecord> {
    const existingUser = await usersRepository.findByUsername(data.username);

    if (existingUser) {
      const error = new Error('Username already exists');
      (error as Error & { statusCode?: number; code?: string }).statusCode = 409;
      (error as Error & { statusCode?: number; code?: string }).code = 'USER_ALREADY_EXISTS';
      throw error;
    }

    return usersRepository.create(data);
  },

  async updateUser(id: number, data: UpdateUserInput): Promise<UserRecord> {
    const existing = await usersRepository.findById(id);

    if (!existing) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number; code?: string }).statusCode = 404;
      (error as Error & { statusCode?: number; code?: string }).code = 'USER_NOT_FOUND';
      throw error;
    }

    if (data.username && data.username !== existing.username) {
      const userByName = await usersRepository.findByUsername(data.username);
      if (userByName) {
        const error = new Error('Username already exists');
        (error as Error & { statusCode?: number; code?: string }).statusCode = 409;
        (error as Error & { statusCode?: number; code?: string }).code = 'USER_ALREADY_EXISTS';
        throw error;
      }
    }

    return usersRepository.update(id, data);
  },

  async deleteUser(id: number): Promise<UserRecord> {
    const existing = await usersRepository.findById(id);

    if (!existing) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number; code?: string }).statusCode = 404;
      (error as Error & { statusCode?: number; code?: string }).code = 'USER_NOT_FOUND';
      throw error;
    }

    return usersRepository.remove(id);
  },
};
