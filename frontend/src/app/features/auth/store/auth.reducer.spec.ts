import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../../../core/constants/storage.constants';

const makeUser = () => ({
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  jobRole: 'tech' as const,
});

describe('authReducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('clears persisted auth state when logout is dispatched', async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'persisted-token');
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(makeUser()));

    const { authReducer, initialAuthState } = await import('./auth.reducer');
    const state = authReducer(initialAuthState, { type: '[Auth] Logout' });

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_KEY)).toBeNull();
  });
});
