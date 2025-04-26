import { Button } from "./button";
import Link from "next/link"; 

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="fixed w-full flex justify-between border-b px-4 bg-black z-50">
      <div className="text-lg font-bold text-white flex items-center">
        <Link href="/">
          Smart Wallet
        </Link>
      </div>
      <div className="flex items-center py-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
