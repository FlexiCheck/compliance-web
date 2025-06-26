'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getCachedTokenReport } from '@/app/server/actions/token';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { AIRIskAnalysisCategory } from '@/lib/_types';

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
import { AiRiskAnalysis } from './sections/ai-risk-analysis';
import { HolderAnalysis } from './sections/holder-analysis';
import { WebsiteContentAnalysis } from './sections/website-content-analysis';

export const TokenDetails = () => {
  const router = useRouter();
  const $report = useQuery({
    queryKey: ['cached-report'],
    queryFn: getCachedTokenReport,
    retry: false,
  });

  if ($report.isLoading) {
    return <DetailsSkeleton />;
  }

  if (!$report.data) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Welcome, scan your first token!"
        description="Get started by scanning a token to analyze its compliance and security."
        action={<Button onClick={() => router.push('/dashboard/scan')}>Scan Token</Button>}
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
          <AiRiskAnalysis ai_risk_analysis={report?.ai_risk_analysis ?? {}} />
          <TokenReview
            tokenReview={certik_data?.token_review ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Smart Contract Risks'
            )}
          />
          <MarketFundamentals
            marketFundamentals={certik_data?.market_fundamentals ?? {}}
            fundamentals={certik_data?.fundamentals ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Market Fundamentals'
            )}
          />
          <DomainInfo
            domainInfo={report?.domain_info ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Domain Info'
            )}
          />
          <WebsiteContentAnalysis website_content_screening={report?.website_content_screening} />
          <Operational
            operational={certik_data?.operational ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Operational Metrics'
            )}
          />
          {/* Coming soon */}
          <AdverseMedia
            adverseMedias={report?.adverse_media_project}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Adverse Media'
            )}
          />
          <HolderAnalysis
            holderAnalysis={certik_data?.token_holder_analysis ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Token Distribution'
            )}
          />
          <CommunityInfo
            communityInfo={certik_data?.community_info ?? {}}
            ai_risk={report?.ai_risk_analysis?.categories?.find(
              (item: AIRIskAnalysisCategory) => item?.category === 'Community Activity'
            )}
          />

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
