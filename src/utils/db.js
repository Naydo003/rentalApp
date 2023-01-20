import { PrismaClient } from '@prisma/client'


export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],          // this will log SQL each time a query is made
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma