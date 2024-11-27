import { PrismaClient } from '@prisma/client';
import { BarChart } from 'lucide-react';

declare global {
    var prisma: PrismaClient | undefined;
}

// prisma = new PrismaClient();

export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
