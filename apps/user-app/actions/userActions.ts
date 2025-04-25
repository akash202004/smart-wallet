"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";

export async function getUserBalance() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "Not authenticated",
    };
  }
  const user = await prisma.balance.findUnique({
    where: {
      userId: userId,
    },
  });
  return {
    user,
  };
}

export async function createUserBalance(userId: number) {
  if (!userId) {
    return { message: "Not authenticated" };
  }

  const user = await prisma.balance.create({
    data: {
      userId: userId,
      amount: 0,
      locked: 0,
    },
  });

  return { user };
}
