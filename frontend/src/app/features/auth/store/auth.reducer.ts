import { createReducer, on } from '@ngrx/store';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../../../core/constants/storage.constants';
import { AuthState, User } from '../models/auth.model';
import { login, loginFailure, loginSuccess, logout } from './auth.actions';

const persistedToken = localStorage.getItem(AUTH_TOKEN_KEY);
const persistedUser = (() => {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
})();

export const initialAuthState: AuthState = {
  user: persistedUser,
  token: persistedToken,
  isAuthenticated: Boolean(persistedToken && persistedUser),
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { user, token }) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return {
      ...state,
      user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    return {
      ...state,
      loading: false,
      error,
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }),
  on(logout, () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }),
);
