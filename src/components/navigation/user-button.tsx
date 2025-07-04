'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { logoutAction, removeTokenCookies } from '@/server/actions';

import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const UserButton = () => {
  const $logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutAction,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer w-10 h-10">
          <AvatarFallback>
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-between">
          <Link href="/dashboard/profile" className="w-full flex gap-3 justify-between">
            Profile <User />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between"
          onClick={() => {
            $logout.mutate(undefined, {
              onSuccess: async () => {
                await removeTokenCookies();
                redirect('/sign-in');
              },
            });
          }}
        >
          Logout <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
