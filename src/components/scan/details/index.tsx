'use client';

import { useQuery } from '@tanstack/react-query';
// import { getReportStatusAction } from '@/server/actions/token';
import { DetailsSkeleton } from './details-skeleton';
import { ScanningLoader } from '../scanning-loader';
import { Report } from './report';
import { getProjectOverview } from '@/lib/api/dashboard';
interface props {
  url: string;
  tokenAddress: string;
  chainId: string;
  tokenName: string;
}
export const TokenDetails = ({ url, tokenAddress, chainId, tokenName }: props) => {
  //Since all the data is not loaded at once:
  //We would only fetch the basic data and lets show that
  const $projectOverviewReport = useQuery({
    queryKey: ['project-overview', url], // Include URL in query key for caching
    queryFn: () => getProjectOverview({ url }),
    enabled: !!url, // Only run query if URL exists
    retry: false,
  });

  if ($projectOverviewReport.isPending) {
    return <DetailsSkeleton />;
  }

  if ($projectOverviewReport.isLoading) {
    return <ScanningLoader />;
  }

  // Error state
  if ($projectOverviewReport.isError) {
    return (
      <p className="text-red-300 font-bold">
        Failed to fetch report status: {$projectOverviewReport.error?.message || 'Unknown error'}
      </p>
    );
  }

  const token_address = $projectOverviewReport?.data?.token_overview?.token_contract;

  return (
    <Report
      isFailed={$projectOverviewReport.isError}
      projectOverviewData={$projectOverviewReport.data}
      tokenAddress={token_address}
      chainId={chainId}
      url={url}
      tokenName={tokenName}
    />
  );
};
