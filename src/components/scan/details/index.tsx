'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

import { getCachedTokenReport } from '@/app/server/actions/token';
import { Accordion } from '@/components/ui/accordion';
import { EmptyState } from '@/components/ui/empty-state';

import { DetailsSkeleton } from './details-skeleton';
import {
  AdverseMedia,
  CommunityInfo,
  DomainInfo,
  MarketFundamentals,
  Operational,
  TokenOverview,
  TokenReview,
} from './sections';
import { HolderAnalysis } from './sections/holder-analysis';

export const TokenDetails = () => {
  const $report = useQuery({
    queryKey: ['cached-report'],
    queryFn: getCachedTokenReport,
    staleTime: 0,
  });

  if ($report.isLoading) {
    return <DetailsSkeleton />;
  }

  if (!$report.data) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No Report Available"
        description="We couldn't find any report data for this token. Please try scanning the token again."
      />
    );
  }

  const report = $report.data;
  const certik_data = report?.certik_data;

  return (
    <div className="w-full h-full space-y-5">
      <TokenOverview
        token_overview={{
          ticker: report.token_symbol,
          ...(certik_data?.token_overview ?? {}),
        }}
      />

      <Accordion type="single" collapsible>
        <div className="space-y-5 pb-8">
          <TokenReview tokenReview={certik_data?.token_review ?? {}} />
          <MarketFundamentals
            marketFundamentals={certik_data?.market_fundamentals ?? {}}
            fundamentals={certik_data?.fundamentals ?? {}}
          />
          <DomainInfo domainInfo={report?.domain_info ?? {}} />
          <Operational operational={certik_data?.operational ?? {}} />
          {/* Coming soon */}
          <AdverseMedia adverseMedia={null} />
          <HolderAnalysis holderAnalysis={certik_data?.token_holder_analysis ?? {}} />
          <CommunityInfo communityInfo={certik_data?.community_info ?? {}} />
        </div>
      </Accordion>
    </div>
  );
};
