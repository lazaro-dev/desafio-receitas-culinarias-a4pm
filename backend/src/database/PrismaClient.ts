import env from "@/config/env";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const PrismaClientService = global.prisma || new PrismaClient({
  log: ["error", "info", "query", "warn"],
})

if (env.NODE_ENV === 'development') global.prisma = PrismaClientService

export { PrismaClientService }