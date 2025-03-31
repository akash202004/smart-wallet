"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { Sidebar } from "@repo/ui/sidebar";
import { Home } from "@repo/ui/home";
import { Transaction } from "@repo/ui/transaction";
import { Transfer } from "@repo/ui/transfer";
import { useState } from "react";

export default function Page(): JSX.Element {
  const session = useSession();
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen flex flex-col bg-black ">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <div className="flex flex-1">
        <Sidebar setActivePages={setActivePage} activePage={activePage} />
        <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 mt-16 md:mt-0">
          {activePage === "home" && <Home />}
          {activePage === "transfer" && <Transfer />}
          {activePage === "transaction" && <Transaction />}
        </main>
      </div>
    </div>
  );
}