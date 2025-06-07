'use client';

import { useQuery } from '@tanstack/react-query';

import { Accordion } from '@/components/ui/accordion';
import { getCachedTokenReport } from '@/server/actions/token';

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
  });

  if ($report.isLoading) {
    return <DetailsSkeleton />;
  }

  if (!$report.data) {
    return (
      <div className="w-full h-full">
        <h1>Failed to load report</h1>
      </div>
    );
  }

  const report = $report.data;
  const certik_data = report.certik_data;

  return (
    <div className="w-full h-full space-y-5">
      <TokenOverview
        token_overview={{
          ticker: report.token_symbol,
          ...(certik_data.token_overview ?? {}),
        }}
      />

      <Accordion type="single" collapsible>
        <div className="space-y-5 pb-8">
          <TokenReview tokenReview={certik_data.token_review ?? {}} />
          <MarketFundamentals
            marketFundamentals={certik_data.market_fundamentals ?? {}}
            fundamentals={certik_data.fundamentals ?? {}}
          />
          <DomainInfo domainInfo={report.domain_info ?? {}} />
          <Operational operational={certik_data.operational ?? {}} />
          {/* Coming soon */}
          <AdverseMedia adverseMedia={null} />
          <HolderAnalysis holderAnalysis={certik_data.token_holder_analysis ?? {}} />
          <CommunityInfo communityInfo={certik_data.community_info ?? {}} />
        </div>
      </Accordion>
    </div>
  );
};
