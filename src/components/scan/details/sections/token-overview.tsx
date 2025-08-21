import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { TokenOverviewAnalysis } from '@/lib/_types';
import { socialIcons } from '@/lib/utils';

import { DetailsItem } from '../details-item';
import { useQuery } from '@tanstack/react-query';
import { coinGeckoDatafetcher } from '@/lib/api/coin-gecko';
import { useEffect, useState } from 'react';

type Props = {
  token_overview: TokenOverviewAnalysis | null;
  tokenAddress: string;
  chainId: string;
};

export const TokenOverview = ({ token_overview, tokenAddress, chainId }: Props) => {
  const [enrichedData, setEnrichedData] = useState<TokenOverviewAnalysis | null>(token_overview);

  if (!token_overview) {
    return <div>No token overview data available</div>; // Handle null case
  }

  // Check if any required fields are missing
  const hasMissingPriceData = (data: TokenOverviewAnalysis | null): boolean => {
    if (!data) return true;
    return !data.price || !data.market_cap || !data.volume_24h;
  };
  const shouldFetch = hasMissingPriceData(token_overview);

  //Now that we have figured out if any of the files are missing or not, we can run the query
  const {
    data: geckoData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['token-price-data', tokenAddress, chainId],
    queryFn: () => coinGeckoDatafetcher(tokenAddress, chainId),
    enabled: shouldFetch, // Only fetch if we're missing data
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });

  // Update enriched data when we get new data from CoinGecko
  useEffect(() => {
    if (shouldFetch && isSuccess && geckoData && token_overview) {
      const updatedData: TokenOverviewAnalysis = {
        ...token_overview,
        price: geckoData.market_data.current_price.usd,
        market_cap: geckoData.market_data.market_cap.usd,
        volume_24h: geckoData.market_data.total_volume.usd,
        // You can also add the 24h high/low if needed:
        // low_24h: formatPrice(geckoData.market_data.low_24h.usd),
        // high_24h: formatPrice(geckoData.market_data.high_24h.usd),
      };
      setEnrichedData(updatedData);
    } else if (!shouldFetch) {
      // If we don't need to fetch, use the original data
      setEnrichedData(token_overview);
    }
  }, [isSuccess, geckoData, token_overview, shouldFetch]);

  if (!enrichedData && !isLoading) {
    return <div>No token overview data available</div>;
  }

  console.log('In the component: ', enrichedData);
  const { ticker, price, market_cap, volume_24h, website, token_contract, socials, description } =
    enrichedData!;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-3xl font-bold">{ticker} Token Analysis</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
        <DetailsItem
          title="Current Price"
          subContent={<p className="text-sm text-gray-500">Ticker: {ticker}</p>}
        >
          <p className="text-2xl font-bold text-blue-600">{price ?? 'N/A'}</p>
        </DetailsItem>
        <DetailsItem title="Market Cap">
          <p className="text-2xl font-semibold text-green-600">{market_cap ?? 'N/A'}</p>
        </DetailsItem>
        <DetailsItem title="Trading Volume (24h)">
          <p className="text-2xl font-semibold text-purple-600">{volume_24h ?? 'N/A'}</p>
        </DetailsItem>
      </div>

      <DetailsItem title="Contract address">
        <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
          {tokenAddress ?? 'N/A'}
        </div>
      </DetailsItem>

      <DetailsItem title="Website & Socials">
        <div className="flex items-center gap-5 mt-2 gap-y-3 flex-wrap">
          {website && (
            <Link target="_blank" href={website}>
              <Button variant="external" size="xs">
                Website <LucideExternalLink />
              </Button>
            </Link>
          )}

          {tokenAddress && (
            <Link target="_blank" href={`https://etherscan.io/token/${tokenAddress}`}>
              <Button variant="external" size="xs">
                Etherscan <LucideExternalLink />
              </Button>
            </Link>
          )}

          {socials &&
            Object.entries(socials).map(([name, value]) => {
              const Icon = socialIcons[name as keyof typeof socialIcons];
              if (!value) {
                return null;
              }
              return (
                <Link key={name} target="_blank" href={value} className="text-blue-600">
                  <Button variant="external" size="xs">
                    {name.replace(/\b\w/g, (l) => l.toUpperCase())}
                    {Icon && <Icon className="w-2.5 h-2.5" />}
                  </Button>
                </Link>
              );
            })}
        </div>
      </DetailsItem>
    </div>
  );
};
