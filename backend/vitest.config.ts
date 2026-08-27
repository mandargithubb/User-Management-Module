import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.{spec,test}.{js,ts}', 'src/**/*.{spec,test}.{js,ts}'],
    exclude: ['dist/**', 'node_modules/**'],
  },
});
