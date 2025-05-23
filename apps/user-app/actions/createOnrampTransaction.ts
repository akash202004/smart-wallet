"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";

interface Transaction {
  amount: number;
  provider: string;
}

export async function createOnrampTransaction({
  amount,
  provider,
}: Transaction) {
  const token = Math.random().toString();
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "Not authenticated",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId,
      amount: amount,
      provider: provider,
      token: token,
      status : "Processing"
    },
  });
  return {
    message: "Onramp transaction created",
    data: {
      userId,
      token,
      amount
    }
  };
}


export async function getOnrampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "Not authenticated",
    };
  }
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
  });
  return {
    transactions,
  };
}

