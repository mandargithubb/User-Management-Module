import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_KEY } from '../constants/storage.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return next(authReq);
};
