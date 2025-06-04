import { ReactNode } from 'react';

import { Navigation } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
