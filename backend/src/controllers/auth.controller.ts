import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { buildResponse } from '../utils/api-response.js';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(buildResponse(true, 'Login successful', result));
    } catch (error) {
      next(error);
    }
  },
};
