import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/database.js';
import { LoginInput } from '../validators/auth.validator.js';
import { UserRecord } from '../models/user.model.js';

const DEMO_PASSWORD = 'admin123';

export const authService = {
  async login({ username, password }: LoginInput): Promise<{ token: string; user: UserRecord }> {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || password !== DEMO_PASSWORD) {
      const error = new Error('Invalid username or password');
      (error as Error & { statusCode?: number; code?: string }).statusCode = 401;
      (error as Error & { statusCode?: number; code?: string }).code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const token = jwt.sign({ sub: user.id, username: user.username }, env.jwtSecret, { expiresIn: '8h' });

    return {
      token,
      user: user as UserRecord,
    };
  },
};
