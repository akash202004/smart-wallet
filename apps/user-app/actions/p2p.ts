"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";

interface GetP2PProps {
  to: number;
  amount: number;
}

export async function getP2P({ to, amount }: GetP2PProps) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "Not authenticated",
    };
  }
  const from = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!from) {
    return {
      message: "User not found",
    };
  }
  const toUser = await prisma.user.findUnique({
    where: {
      id: to,
    },
  });
  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`
    const checkBalance = await tx.balance.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!checkBalance) {
      return {
        message: "User not found",
      };
    }
    if (checkBalance.amount < amount) {
      return {
        message: "Insufficient funds",
      };
    }
    await tx.balance.update({
      where: {
        userId: userId,
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });
    await tx.balance.update({
      where: {
        userId: to,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
    await tx.p2pTransaction.create({
      data: {
        amount: Number(amount),
        fromUserId: Number(userId),
        toUserId: Number(to)
      },
    });
    return {
      message: "Success p2p Transaction",
    };
  });
}
