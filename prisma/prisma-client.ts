// lib/prisma.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { config } from '../config';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: config.databaseUrl, ssl: false }),
  });

export const prisma = prismaClient;

globalForPrisma.prisma = prismaClient;
