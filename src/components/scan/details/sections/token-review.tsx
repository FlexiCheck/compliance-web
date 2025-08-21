import {
  AIRIskAnalysisCategory,
  Nullable,
  SecurityCheckColor,
  SecurityCheckKeys,
  TokenReviewPAnalysis,
} from '@/lib/_types';
import { securityCheckIcons, securityCheckLabels } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useQuery } from '@tanstack/react-query';
import { getProjectSecurity } from '@/lib/api/dashboard';
import { useEffect, useState } from 'react';
import { fetchTop10HoldersRatio } from '@/lib/api/coin-gecko';

const SecurityCheckItem = ({
  title,
  checkItem,
}: {
  title: string;
  checkItem: SecurityCheckColor;
}) => {
  const { Icon, color } = securityCheckIcons[checkItem];

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium text-base">{title}</span>
      <div className="flex items-center gap-2">
        <Icon size={16} className={color} />
      </div>
    </div>
  );
};

type Props = {
  tokenAddress: string;
  chainId: string;
  url: string;
};

// Type for your security report data
type SecurityReportData = {
  contract: string;
  major_holders_ratio?: string;
  top_10_holders_ratio?: string;
  buy_tax?: string;
  sell_tax?: string;
  is_honeypot?: string;
  is_mintable?: string;
  has_blacklist?: string;
  is_anti_whale?: string;
  tax_can_be_modified?: string;
  hidden_owner?: string;
  proxy_contract?: string;
};

export const TokenReview = ({ tokenAddress, chainId, url }: Props) => {
  const [enrichedData, setEnrichedData] = useState<SecurityReportData | null>(null);

  const $projectSecurityReport = useQuery({
    queryKey: ['project-security', url], // Include URL in query key for caching
    queryFn: () => getProjectSecurity({ url }),
    enabled: !!url, // Only run query if URL exists
    retry: false,
  });

  // Check if we need to fetch external data
  const needsExternalData = (data: SecurityReportData | null): boolean => {
    if (!data) return false;
    return !data.major_holders_ratio || !data.top_10_holders_ratio;
  };

  const shouldFetchExternal =
    $projectSecurityReport.isSuccess &&
    $projectSecurityReport.data &&
    needsExternalData($projectSecurityReport.data);

  // Second query - fetch from external API if needed
  const {
    data: externalSecurityData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['external-security-top-10', tokenAddress],
    queryFn: () => fetchTop10HoldersRatio(tokenAddress),
    enabled: shouldFetchExternal, // Only fetch if we need external data
    retry: 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  //Calling
  useEffect(() => {
    if ($projectSecurityReport.isSuccess && $projectSecurityReport.data) {
      const baseData = $projectSecurityReport.data;

      if (shouldFetchExternal && isSuccess && externalSecurityData) {
        // Merge internal data with external data
        const updatedData: SecurityReportData = {
          ...baseData,
          // Only override if the original data was missing or unknow
          top_10_holders_ratio:
            baseData.top_10_holders_ratio ||
            externalSecurityData?.result?.reduce(
              (acc: number, curr: any) => acc + curr?.percentage_relative_to_total_supply,
              0
            ),
        };
        setEnrichedData(updatedData);
      } else if (!shouldFetchExternal) {
        // We have all the data we need from internal API
        setEnrichedData(baseData);
      }
    }
  }, [
    $projectSecurityReport.isSuccess,
    $projectSecurityReport.data,
    isSuccess,
    externalSecurityData,
    shouldFetchExternal,
  ]);
  if (!enrichedData && !isLoading) {
    return <div>No token overview data available</div>;
  }

  return (
    <DetailsAccordion title="Token Review">
      <div className="space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}
        <DetailsItem title="Contract Address">
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
            {tokenAddress ?? 'N/A'}
          </div>
        </DetailsItem>

        <DetailsItem title="Top 10 Holders Ratio">
          <p className="text-lg font-semibold text-orange-600">
            {enrichedData?.top_10_holders_ratio ?? 'N/A'}
          </p>
        </DetailsItem>

        {/* <DetailsItem title="Security Checks">
          <div className="space-y-2 mt-2">
            {securityCheckArray.map(([key, value]) => {
              const label = securityCheckLabels[key as SecurityCheckKeys];

              return (
                value !== null &&
                label && <SecurityCheckItem key={key} title={label} checkItem={value} />
              );
            })}
          </div>
        </DetailsItem> */}
      </div>
    </DetailsAccordion>
  );
};
