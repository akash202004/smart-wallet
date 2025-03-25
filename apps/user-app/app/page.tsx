import { JSX } from "react";
import { PrismaClient } from "@smart-wallet/db/client";

const prisma = new PrismaClient();

export default function Page(): JSX.Element {
  return (
    <div>
      <h1 className="text-xl bold">Hello World</h1>
    </div>
  );
}
