import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b flex items-center justify-between">
      <Link className="text-2xl font-bold text-text-main" href="/dashboard">
        Compilance
      </Link>

      <div className="flex items-center gap-5">
        <Link href="/dashboard/scan">
          <Button>Scan Token</Button>
        </Link>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
