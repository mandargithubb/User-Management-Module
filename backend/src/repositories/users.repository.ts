import { prisma } from '../config/database.js';
import { CreateUserInput, UpdateUserInput, UserRecord } from '../models/user.model.js';

export const usersRepository = {
  async findAll(): Promise<UserRecord[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } }) as Promise<UserRecord[]>;
  },

  async findById(id: number): Promise<UserRecord | null> {
    return prisma.user.findUnique({ where: { id } }) as Promise<UserRecord | null>;
  },

  async findByUsername(username: string): Promise<UserRecord | null> {
    return prisma.user.findUnique({ where: { username } }) as Promise<UserRecord | null>;
  },

  async create(data: CreateUserInput): Promise<UserRecord> {
    return prisma.user.create({ data }) as Promise<UserRecord>;
  },

  async update(id: number, data: UpdateUserInput): Promise<UserRecord> {
    return prisma.user.update({ where: { id }, data }) as Promise<UserRecord>;
  },

  async remove(id: number): Promise<UserRecord> {
    return prisma.user.delete({ where: { id } }) as Promise<UserRecord>;
  },
};
