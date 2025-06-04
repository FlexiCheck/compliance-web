'use client';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/query';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
