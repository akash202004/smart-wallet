import { PrismaClient } from "@prisma/client";

class prismaClientSingleton {
  private static instance: PrismaClient | null = null;
  constructor() {}
  static getInstance(): PrismaClient {
    if (!prismaClientSingleton.instance) {
      prismaClientSingleton.instance = new PrismaClient();
    }
    return prismaClientSingleton.instance;
  }
}

export const prisma = prismaClientSingleton.getInstance();
