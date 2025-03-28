"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@smart-wallet/ui/Appbar";
import { JSX } from "react";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
    <h1 className="p-1 text-amber-900">Akash</h1>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}