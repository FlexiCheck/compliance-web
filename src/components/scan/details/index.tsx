'use client';

import { useQuery } from '@tanstack/react-query';

import { Accordion } from '@/components/ui/accordion';
import {
  AdverseMediaAnalysis,
  CommunityInfoAnalysis,
  DomainInfoAnalysis,
  FundamentalsAnalysis,
  MarketFundamentalsAnalysis,
  OperationalAnalysis,
  TokenHolderAnalysis,
  TokenOverviewAnalysis,
  TokenReviewPAnalysis,
} from '@/lib/_types';
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

type Props = {
  overview: TokenOverviewAnalysis;
  review: TokenReviewPAnalysis;
  marketFundamentals: MarketFundamentalsAnalysis;
  fundamentals: FundamentalsAnalysis;
  domainInfo: DomainInfoAnalysis;
  operational: OperationalAnalysis;
  adverseMedia: AdverseMediaAnalysis;
  holderAnalysis: TokenHolderAnalysis;
  communityInfo: CommunityInfoAnalysis;
};

export const TokenDetails = ({
  overview,
  review,
  marketFundamentals,
  fundamentals,
  domainInfo,
  operational,
  adverseMedia,
  holderAnalysis,
  communityInfo,
}: Props) => {
  const $report = useQuery({
    queryKey: ['cached-report'],
    queryFn: getCachedTokenReport,
    enabled: false, // TODO remove when request will be ready
  });

  if ($report.isLoading) {
    return <DetailsSkeleton />;
  }

  return (
    <div className="w-full h-full space-y-5">
      <TokenOverview token_overview={overview} />

      <Accordion type="single" collapsible>
        <div className="space-y-5 pb-8">
          <TokenReview tokenReview={review} />
          <MarketFundamentals marketFundamentals={marketFundamentals} fundamentals={fundamentals} />
          <DomainInfo domainInfo={domainInfo} />
          <Operational operational={operational} />
          <AdverseMedia adverseMedia={adverseMedia} />
          <HolderAnalysis holderAnalysis={holderAnalysis} />
          <CommunityInfo communityInfo={communityInfo} />
        </div>
      </Accordion>
    </div>
  );
};
