"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useState } from "react";
import { Sidebar } from "@repo/ui/sidebar";

export default function Page(): JSX.Element {
  const session = useSession();
  const [activePage, setActivePage] = useState("home");

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <div className="flex">
        <Sidebar setActivePages={setActivePage} activePage={activePage} />
        <main>
          {activePage === "home" && <h1>Home</h1>}
          {activePage === "transfer" && <h1>Hometransfer</h1>}
          {activePage === "transaction" && <h1>transaction</h1>}
        </main>
      </div>
    </div>
  );
}
