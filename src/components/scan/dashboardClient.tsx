// app/dashboard/ClientDashboard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { TokenDetails } from '@/components/scan/details';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { AlertCircle } from 'lucide-react';
import { TokenOverviewAnalysis } from '@/lib/_types';

type Props = {
  url: string | undefined;
  tokenAddress: string | undefined;
  chainId: string | undefined;
  tokenName: string | undefined;
};

const ClientDashboard: React.FC<Props> = ({ url, tokenAddress, chainId, tokenName }) => {
  const router = useRouter();

  // Strict check for null or undefined
  // if (!url || !tokenAddress || !chainId) {
  if (!url || !tokenAddress || !chainId || !tokenName) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Welcome, scan your first token!"
        description="Get started by scanning a token to analyze its compliance and security."
        action={<Button onClick={() => router.push('/dashboard/scan')}>Scan Token</Button>}
      />
    );
  }

  return (
    <TokenDetails url={url} tokenAddress={tokenAddress} chainId={chainId} tokenName={tokenName} />
  );
};

export default ClientDashboard;
