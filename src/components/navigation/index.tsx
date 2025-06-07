import { DialogTitle } from '@radix-ui/react-dialog';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Sidebar } from '../sidebar';
import { UserButton } from './user-button';

export const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-muted rounded-full w-10 h-10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 gap-0">
            <DialogTitle></DialogTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <Link className="text-2xl font-bold text-text-main hidden md:block" href="/dashboard">
          Compilance
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Link href="/dashboard/scan">
          <Button>Scan Token</Button>
        </Link>

        <UserButton />
      </div>
    </nav>
  );
};
