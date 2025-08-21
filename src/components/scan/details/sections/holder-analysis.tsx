import { AIRIskAnalysisCategory, TokenHolderAnalysis, WhaleMovementIndicator } from '@/lib/_types';
import { formatNumber, whaleMovementIndicatorColors } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useEffect, useState } from 'react';
import { fetchTotalHolders } from '@/lib/api/coin-gecko';
import { useQuery } from '@tanstack/react-query';

type Props = {
  token_holder_analysis: {
    total_holders: number | null;
    whale_movement_indicator: string | null;
  } | null;
  tokenAddress: string;
};

export const HolderAnalysis = ({ token_holder_analysis, tokenAddress }: Props) => {
  const [total_holders, set_total_holders] = useState(token_holder_analysis?.total_holders);

  // Check if we need to fetch data - only if total_holders doesn't exist
  const shouldFetchMoralis: boolean = !token_holder_analysis?.total_holders;

  const {
    data: moralisData,
    isLoading: isLoadingMoralis,
    error: errorMoralis,
    isSuccess: isSuccessMoralis,
  } = useQuery({
    queryKey: ['moralis-total_holders', tokenAddress],
    queryFn: () => fetchTotalHolders(tokenAddress),
    enabled: shouldFetchMoralis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Update state when Moralis data is successfully fetched
  useEffect(() => {
    if (isSuccessMoralis && moralisData) {
      // Merge the fetched data with existing data
      set_total_holders(moralisData?.totalHolders);
    }
  }, [isSuccessMoralis, moralisData, token_holder_analysis]);

  // Initialize state with props data
  useEffect(() => {
    set_total_holders(token_holder_analysis?.total_holders || 0);
  }, [token_holder_analysis]);

  // Error handling
  useEffect(() => {
    if (errorMoralis) {
      console.error('Moralis API error:', errorMoralis);
    }
  }, [errorMoralis]);

  const indicator =
    token_holder_analysis?.whale_movement_indicator?.toLowerCase() as WhaleMovementIndicator;
  const indicatorColor = whaleMovementIndicatorColors[indicator ?? 'medium'];

  return (
    <DetailsAccordion title="Token holder Analysis">
      <div className="w-full space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}

        <div className="w-full flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Total Holders">
            <p className="text-2xl font-bold text-blue-600">{total_holders}</p>
          </DetailsItem>

          <DetailsItem title="Whale Movement">
            <p className={`text-2xl font-bold ${indicatorColor} first-letter:uppercase`}>
              {token_holder_analysis?.whale_movement_indicator}
            </p>
          </DetailsItem>
        </div>
      </div>
    </DetailsAccordion>
  );
};
