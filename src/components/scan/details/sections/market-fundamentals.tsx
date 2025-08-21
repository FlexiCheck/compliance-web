import { ReactNode, useEffect, useState } from 'react';

import {
  AIRIskAnalysisCategory,
  CexInfo,
  FundamentalsAnalysis,
  MarketFundamentalsAnalysis,
} from '@/lib/_types';
import { cn, formatNumber } from '@/lib/utils';

import { AIRisk, AISummaryText } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useQuery } from '@tanstack/react-query';
import { coinGeckoDatafetcher, fetchUniqueWallets24h } from '@/lib/api/coin-gecko';

const CexCard = ({ name, daily_netflow, market_cap_held }: CexInfo) => {
  const isPositive = daily_netflow?.includes('+');

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{name ?? 'N/A'}</div>
        <div className="text-sm text-gray-600">Market Cap Held: {market_cap_held ?? 'N/A'}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-600">Daily Net Flow</div>
        <div
          className={cn('font-semibold text-red-600', {
            'text-green-600': isPositive,
          })}
        >
          {daily_netflow ?? 'N/A'}
        </div>
      </div>
    </div>
  );
};

export const DetailsSubItem = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="w-full">
      <div className="text-gray-600 text-xs mb-1">{title}</div>
      {children}
    </div>
  );
};

type Props = {
  marketFundamentals: {
    token_price: string | null;
    low: string | null;
    high: string | null;
    volume_24h: string | null;
    market_cap: string | null;
    volume_by_exchange_type_24h: {
      CEX: string | null;
      DEX: string | null;
    } | null;
    cex_info: Array<{
      name: string;
      daily_netflow: string | null;
      market_cap_held: string | null;
    }> | null;
    total_value_locked_24h: string | null;
    unique_active_wallets_24h: string | null;
    tvl_ratio: string | null;
    ai_summary: string | null;
  } | null;
  fundamentals: {
    total_active_users_7d: number | null;
    token_transferred_7d: number | null;
    total_transactions_7d: number | null;
  } | null;
  tokenAddress: string;
  chainId: string;
  url: string;
};

interface enrichedDataSchema {
  token_price: string | null;
  low_24h: string | null;
  high_24h: string | null;
  volume_24h: string | null;
  market_cap: string | null;
  volume_by_exchange_type_24h: {
    CEX: string | null;
    DEX: string | null;
  } | null;
  cex_info: Array<{
    name: string;
    daily_netflow: string | null;
    market_cap_held: string | null;
  }> | null;
  total_value_locked_24h: string | null;
  unique_active_wallets_24h: string | null;
  tvl_ratio: string | null;
  ai_summary: string | null;
  total_active_users_7d: number | null;
  token_transferred_7d: number | null;
  total_transactions_7d: number | null;
}

// Helper functions to check what data is missing
const needsCoinGeckoData = (data: enrichedDataSchema | null): boolean => {
  if (!data) return false;
  return (
    !data.volume_24h || !data.market_cap || !data.token_price || !data.low_24h || !data.high_24h
  );
};

const needsMoralisData = (data: enrichedDataSchema | null): boolean => {
  if (!data) return false;
  return !data.unique_active_wallets_24h;
};

export const MarketFundamentals = ({
  marketFundamentals,
  fundamentals,
  tokenAddress,
  chainId,
  url,
}: Props) => {
  const [enrichedData, setEnrichedData] = useState<enrichedDataSchema | null>(null);
  const [hasUpdatedGecko, setHasUpdatedGecko] = useState(false);
  const [hasUpdatedMoralis, setHasUpdatedMoralis] = useState(false);

  // Create initial enriched data from props

  const createInitialData = (): enrichedDataSchema => {
    return {
      // From marketFundamentals
      token_price: marketFundamentals?.token_price || null,
      low_24h: marketFundamentals?.low || null,
      high_24h: marketFundamentals?.high || null,
      volume_24h: marketFundamentals?.volume_24h || null,
      market_cap: marketFundamentals?.market_cap || null,
      volume_by_exchange_type_24h: marketFundamentals?.volume_by_exchange_type_24h || null,
      cex_info: marketFundamentals?.cex_info || null,
      total_value_locked_24h: marketFundamentals?.total_value_locked_24h || null,
      unique_active_wallets_24h: marketFundamentals?.unique_active_wallets_24h || null,
      tvl_ratio: marketFundamentals?.tvl_ratio || null,
      ai_summary: marketFundamentals?.ai_summary || null,
      // From fundamentals
      total_active_users_7d: fundamentals?.total_active_users_7d || null,
      token_transferred_7d: fundamentals?.token_transferred_7d || null,
      total_transactions_7d: fundamentals?.total_transactions_7d || null,
    };
  };

  useEffect(() => {
    const initialData = createInitialData();
    setEnrichedData(initialData);
  }, [marketFundamentals, fundamentals]);

  // Determine what external data we need
  const shouldFetchCoinGecko: boolean = (enrichedData && needsCoinGeckoData(enrichedData)) || false;
  const shouldFetchMoralis: boolean = (enrichedData && needsMoralisData(enrichedData)) || false;

  // Function to update enriched data with Gecko response
  const updateWithGeckoData = (geckoResponse: any) => {
    if (!enrichedData || hasUpdatedGecko) return;
    const updatedData = { ...enrichedData };

    if (!updatedData.token_price && geckoResponse.market_data.current_price.usd) {
      updatedData.token_price = geckoResponse.market_data.current_price.usd;
    }
    if (!updatedData.low_24h && geckoResponse.market_data.low_24h.usd) {
      updatedData.low_24h = geckoResponse.market_data.low_24h.usd;
    }
    if (!updatedData.high_24h && geckoResponse.market_data.high_24h.usd) {
      updatedData.high_24h = geckoResponse.market_data.high_24h.usd;
    }
    if (!updatedData.volume_24h && geckoResponse.market_data.total_volume.usd) {
      updatedData.volume_24h = geckoResponse.market_data.total_volume.usd;
    }
    if (!updatedData.market_cap && geckoResponse.market_data.market_cap.usd) {
      updatedData.market_cap = geckoResponse.market_data.market_cap.usd;
    }
    setEnrichedData(updatedData);
    setHasUpdatedGecko(true);
  };

  // Function to update enriched data with Moralis response
  const updateWithMoralisData = (moralisResponse: any) => {
    if (!enrichedData || hasUpdatedMoralis) return;

    const updatedData = { ...enrichedData };

    if (!updatedData.unique_active_wallets_24h && moralisResponse.uniqueWallets['24h']) {
      updatedData.unique_active_wallets_24h = moralisResponse.uniqueWallets['24h'];
    }

    setEnrichedData(updatedData);
    setHasUpdatedMoralis(true);
  };

  // Initialize enriched data
  useEffect(() => {
    const initialData = createInitialData();
    setEnrichedData(initialData);
    setHasUpdatedGecko(false);
    setHasUpdatedMoralis(false);
  }, [marketFundamentals, fundamentals]);

  const {
    data: geckoData,
    isLoading: isLoadingGecko,
    error: errorGecko,
    isSuccess: isSuccessGecko,
  } = useQuery({
    queryKey: ['token-price-data', tokenAddress, chainId],
    queryFn: () => coinGeckoDatafetcher(tokenAddress, chainId),
    enabled: shouldFetchCoinGecko, // Only fetch if we're missing data
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });

  const {
    data: moralisData,
    isLoading: isLoadingMoralis,
    error: errorMoralis,
    isSuccess: isSuccessMoralis,
  } = useQuery({
    queryKey: ['moralis-analytics', tokenAddress, chainId],
    queryFn: () => fetchUniqueWallets24h(tokenAddress, chainId),
    enabled: shouldFetchMoralis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Update enriched data when Gecko data is available
  useEffect(() => {
    if (isSuccessGecko && geckoData) {
      updateWithGeckoData(geckoData);
    }
  }, [isSuccessGecko, geckoData]);

  // Update enriched data when Moralis data is available
  useEffect(() => {
    if (isSuccessMoralis && moralisData) {
      updateWithMoralisData(moralisData);
    }
  }, [isSuccessMoralis, moralisData]);

  // Error handling
  useEffect(() => {
    if (errorGecko) {
      console.error('CoinGecko API error:', errorGecko);
    }
  }, [errorGecko]);

  useEffect(() => {
    if (errorMoralis) {
      console.error('Moralis API error:', errorMoralis);
    }
  }, [errorMoralis]);

  return (
    <DetailsAccordion title="Market Fundamentals">
      <div className="space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Current Price">
            <p className="text-2xl font-bold text-blue-600">{enrichedData?.token_price ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="24h Low">
            <p className="text-2xl font-bold text-red-600">{enrichedData?.low_24h ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="24h High">
            <p className="text-2xl font-bold text-green-600">{enrichedData?.high_24h ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="24h Volume">
            <p className="text-2xl font-bold text-purple-600">
              {enrichedData?.volume_24h ?? 'N/A'}
            </p>
          </DetailsItem>

          <DetailsItem title="Market Cap">
            <p className="text-2xl font-bold text-green-600">{enrichedData?.market_cap ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        {enrichedData?.volume_by_exchange_type_24h && (
          <DetailsItem title="Volume by Exchange Type (24h)">
            <div className="flex items-stretch gap-5 mt-2 md:flex-nowrap flex-wrap">
              <div className="text-center w-full">
                <p className="text-lg font-semibold text-blue-600">
                  {enrichedData?.volume_by_exchange_type_24h.CEX}
                </p>
                <p className="text-sm text-gray-500">CEX</p>
              </div>

              <div className="text-center w-full">
                <p className="text-lg font-semibold text-orange-600">
                  {enrichedData?.volume_by_exchange_type_24h.DEX}
                </p>
                <p className="text-sm text-gray-500">DEX</p>
              </div>
            </div>
          </DetailsItem>
        )}

        <DetailsItem title="CEX Information">
          <div className="space-y-3 mt-2">
            {enrichedData?.cex_info
              ? enrichedData?.cex_info.map((item) => <CexCard key={item.name} {...item} />)
              : '-'}
          </div>
        </DetailsItem>

        <DetailsItem title="Key Metrics">
          <div className="flex items-stretch mt-2 md:flex-nowrap flex-wrap gap-5">
            <DetailsSubItem title="Total Value Locked (24h)">
              <p className="text-lg font-semibold text-gray-500">
                {enrichedData?.total_value_locked_24h ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Unique Active Wallets (24h)">
              <p className="text-lg font-semibold text-gray-500">
                {enrichedData?.unique_active_wallets_24h ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="TVL Ratio">
              <p className="text-lg font-semibold text-gray-500">
                {enrichedData?.tvl_ratio ?? 'N/A'}
              </p>
            </DetailsSubItem>
          </div>
        </DetailsItem>

        <DetailsItem title="7-Day Fundamentals">
          <div className="flex items-stretch mt-2 gap-5 md:flex-nowrap flex-wrap">
            <DetailsSubItem title="Total Active Users (7d)">
              <p className="text-lg font-semibold text-blue-600">
                {formatNumber(enrichedData?.total_active_users_7d)}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Token Transferred (7d)">
              <p className="text-lg font-semibold text-green-600">
                {enrichedData?.token_transferred_7d ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Total Transactions (7d)">
              <p className="text-lg font-semibold text-purple-600">
                {formatNumber(enrichedData?.total_transactions_7d)}
              </p>
            </DetailsSubItem>
          </div>
        </DetailsItem>

        <DetailsItem title="AI Analysis Summary">
          <AISummaryText text={enrichedData?.ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
