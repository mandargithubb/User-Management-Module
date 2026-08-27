export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
};

export type JwtPayload = {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
