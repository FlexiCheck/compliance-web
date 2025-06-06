import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { TokenOverviewAnalysis } from '@/lib/_types';
import { socialIcons } from '@/lib/utils';

import { DetailsItem } from '../details-item';

type Props = {
  token_overview: TokenOverviewAnalysis;
};

export const TokenOverview = ({
  token_overview: {
    ticker,
    price,
    market_cap,
    volume_24h,
    website,
    token_contract,
    socials,
    description,
  },
}: Props) => {
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
          {token_contract ?? 'N/A'}
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

          {token_contract && (
            <Link target="_blank" href={`https://etherscan.io/token/${token_contract}`}>
              <Button variant="external" size="xs">
                Etherscan <LucideExternalLink />
              </Button>
            </Link>
          )}

          {socials &&
            Object.entries(socials).map(([name, value]) => {
              const Icon = socialIcons[name as keyof typeof socialIcons];

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
