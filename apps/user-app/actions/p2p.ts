"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";

interface GetP2PProps {
  to: string;
  amount: number;
}

export async function getP2P({ to, amount }: GetP2PProps) {
  const session = await getServerSession(authOptions);
  const fromUserId = Number(session?.user?.id);

  if (!fromUserId) {
    return { message: "Not authenticated" };
  }

  const fromUser = await prisma.user.findUnique({
    where: { id: fromUserId },
  });

  if (!fromUser) {
    return { message: "Sender not found" };
  }

  const toUser = await prisma.user.findUnique({
    where: { number: to },
  });

  if (!toUser) {
    return { message: "Receiver not found" };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${fromUserId} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: fromUserId },
    });

    if (!fromBalance) {
      throw new Error("Sender balance not found");
    }

    if (fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: fromUserId },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        amount: Number(amount),
        fromUserId: fromUserId,
        toUserId: toUser.id,
      },
    });
  });

  return { message: "Success p2p Transaction" };
}

export async function fetchP2P() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  if (!userId) {
    return { message: "Not authenticated" };
  }

  const p2pTransfers = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: userId, 
    }
  })

  return {
    data : p2pTransfers
  }
}
