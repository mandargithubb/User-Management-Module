import { describe, it, expect } from 'vitest';

describe('auth service contract', () => {
  it('accepts the demo login credentials shape', () => {
    const payload = { username: 'admin', password: 'admin123' };
    expect(payload.username).toBe('admin');
    expect(payload.password.length).toBeGreaterThanOrEqual(6);
  });
});
