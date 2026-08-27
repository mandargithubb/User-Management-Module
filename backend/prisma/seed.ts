import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { username: 'johndoe', email: 'john@example.com', jobRole: 'tech' },
      { username: 'janedoe', email: 'jane@example.com', jobRole: 'id' },
      { username: 'admin', email: 'admin@example.com', jobRole: 'gd' },
    ],
  });
}

main()
  .catch((error: Error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
