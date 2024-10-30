"use client";

import { useBalance } from "@repo/store/balance";

export default function Home() {
  return (
    <div>
      <h1>Hi Merchant</h1>
      <h2>Balance: {useBalance()}</h2>
    </div>
  );
}
