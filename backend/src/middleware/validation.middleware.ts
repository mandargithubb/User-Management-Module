import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? 'Validation failed';
    res.status(400).json({ success: false, message: firstError, error: 'VALIDATION_ERROR' });
    return;
  }

  req.body = result.data;
  next();
};

export const validateParams = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ success: false, message: 'Invalid route parameters', error: 'INVALID_PARAMS' });
    return;
  }

  req.params = result.data as typeof req.params;
  next();
};
