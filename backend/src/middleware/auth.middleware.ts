import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { JwtPayload } from '../types/common.types.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized', error: 'UNAUTHORIZED' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    if (typeof payload === 'string' || !payload || typeof payload.sub !== 'number') {
      throw new Error('Invalid token payload');
    }

    const userPayload: JwtPayload = {
      sub: payload.sub,
      username: typeof payload.username === 'string' ? payload.username : '',
      iat: payload.iat,
      exp: payload.exp,
    };

    req.user = userPayload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token', error: 'INVALID_TOKEN' });
  }
};
