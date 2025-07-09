'use client';

import { useQuery } from '@tanstack/react-query';

import { getReportStatusAction } from '@/server/actions/token';

import { ScanningLoader } from '../scanning-loader';
import { DetailsSkeleton } from './details-skeleton';
import { Report } from './report';

export const TokenDetails = () => {
  const $reportStatus = useQuery({
    queryKey: ['report-status'],
    queryFn: getReportStatusAction,
    refetchInterval: (data) => {
      if (!data || data.state.data?.status === 'processing') return 5000;
      return false;
    },
    retry: false,
  });

  if ($reportStatus.isPending) {
    return <DetailsSkeleton />;
  }

  if ($reportStatus.data?.status === 'processing') {
    return <ScanningLoader />;
  }

  return $reportStatus.isFetched ? (
    <Report isFailed={!$reportStatus.data || $reportStatus.data.status === 'error'} />
  ) : (
    <p className="text-red-300 font-bold">Failed to fetch report status!</p>
  );
};
