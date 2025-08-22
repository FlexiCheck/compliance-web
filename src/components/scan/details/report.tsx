'use client';

import { useRouter } from 'next/navigation';
import { Accordion } from '@/components/ui/accordion';

import { AIRIskAnalysisCategory, ProjectOverviewData } from '@/lib/_types';
import {
  AdverseMedia,
  CommunityInfo,
  DomainInfo,
  MarketFundamentals,
  Operational,
  TokenOverview,
  TokenReview,
} from './sections';
import { AiRiskAnalysis } from './sections/ai-risk-analysis';
import { HolderAnalysis } from './sections/holder-analysis';
import { WebsiteContentAnalysis } from './sections/website-content-analysis';

type Props = {
  isFailed?: boolean;
  projectOverviewData: ProjectOverviewData;
  tokenAddress: string;
  chainId: string;
  url: string;
  tokenName: string;
};

export const Report = ({
  isFailed,
  projectOverviewData,
  tokenAddress,
  chainId,
  url,
  tokenName,
}: Props) => {
  return (
    <div className="w-full h-full space-y-5">
      {isFailed && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-gray-700 text-center">
            Failed to get new report, this report is from previous scan!
          </p>
        </div>
      )}

      <TokenOverview token_overview={projectOverviewData.token_overview} chainId={chainId} />

      <Accordion type="single" collapsible>
        <div className="space-y-5 pb-8">
          {/* <AiRiskAnalysis ai_risk_analysis={report?.ai_risk_analysis ?? {}} /> */}
          <TokenReview tokenAddress={tokenAddress} chainId={chainId} url={url} />

          <MarketFundamentals
            marketFundamentals={projectOverviewData.market_fundamentals}
            fundamentals={projectOverviewData.fundamentals}
            tokenAddress={tokenAddress}
            chainId={chainId}
            url={url}
          />

          <DomainInfo tokenAddress={tokenAddress} chainId={chainId} url={url} />

          <WebsiteContentAnalysis url={url} />

          <Operational
            operational={projectOverviewData?.operational}
            tokenAddress={tokenAddress}
            chainId={chainId}
          />

          <AdverseMedia tokenName={tokenName} />

          <HolderAnalysis
            token_holder_analysis={projectOverviewData?.token_holder_analysis}
            tokenAddress={tokenAddress}
          />

          <CommunityInfo communityInfo={projectOverviewData.community_info} />

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-gray-700 text-center">
              Disclaimer: This tool aggregates third-party data and provides AI-generated summaries
              for informational purposes only; it does not constitute financial advice, and users
              are encouraged to conduct their own independent research before making any decisions.
            </p>
          </div>
        </div>
      </Accordion>
    </div>
  );
};
