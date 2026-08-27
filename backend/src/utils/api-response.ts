import { ApiResponse } from '../types/common.types.js';

export const buildResponse = <T>(success: boolean, message: string, data?: T, error?: string): ApiResponse<T> => ({
  success,
  message,
  ...(data !== undefined ? { data } : {}),
  ...(error ? { error } : {}),
});
