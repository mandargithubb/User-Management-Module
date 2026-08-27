import app from './app.js';
import { env } from './config/env.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap(): Promise<void> {
  await prisma.$connect();
  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error: Error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
