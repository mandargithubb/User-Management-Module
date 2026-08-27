import { NextFunction, Request, Response } from 'express';
import { buildResponse } from '../utils/api-response.js';

export const errorMiddleware = (
  error: Error & { statusCode?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? 'Something went wrong';
  const code = error.code ?? 'INTERNAL_SERVER_ERROR';

  res.status(statusCode).json(buildResponse(false, message, undefined, code));
};
