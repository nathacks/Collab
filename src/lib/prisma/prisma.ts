import { getPrismaClient } from './getPrismaClient';


type ExtendedPrismaClient = ReturnType<typeof getPrismaClient>;

const globalForPrisma = globalThis as unknown as {
    prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
