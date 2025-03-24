<<<<<<< HEAD
"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <SessionProvider >{children}</SessionProvider>
        </RecoilRoot>
    );
};
=======
"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}
>>>>>>> fffa302 (re-intilizing the repo)
