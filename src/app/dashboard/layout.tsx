import { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { Navigation } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';
import { getUserAction, refreshTokenAction } from '@/server/actions';

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  try {
    const user = await getUserAction();

    if (!user?.email) {
      try {
        const refresh = await refreshTokenAction();

        if (!refresh.access_token || !refresh.refresh_token) {
          redirect('/sign-in');
        }
      } catch {
        redirect('/sign-in');
      }
    }
  } catch {
    redirect('/sign-in');
  }

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex min-h-0">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
