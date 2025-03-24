<<<<<<< HEAD
import styles from "./page.module.css";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Home() {
  return <h1 className="text-5xl">HIIII Thereee.....</h1>;
=======
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
>>>>>>> fffa302 (re-intilizing the repo)
}
