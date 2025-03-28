import { PrismaClient } from "@prisma/client";

class prismaSingleton {
  private static instance: PrismaClient;
  private constructor() {}

  public static getInstance() {
    if (!prismaSingleton.instance) {
      prismaSingleton.instance = new PrismaClient();
    }
    return prismaSingleton.instance;
  }
}

export const prismaClient = prismaSingleton.getInstance();
