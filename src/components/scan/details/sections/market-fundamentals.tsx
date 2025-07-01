import { ReactNode } from 'react';

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
  marketFundamentals: MarketFundamentalsAnalysis;
  fundamentals: FundamentalsAnalysis;
  ai_risk: AIRIskAnalysisCategory;
};

export const MarketFundamentals = ({
  marketFundamentals: {
    token_price,
    low,
    high,
    volume_24h,
    market_cap,
    volume_by_exchange_type_24h,
    cex_info,
    total_value_locked_24h,
    unique_active_wallets_24h,
    tvl_ratio,
    ai_summary,
  },
  fundamentals: { total_active_users_7d, token_transferred_7d, total_transactions_7d },
  ai_risk,
}: Props) => {
  return (
    <DetailsAccordion title="Market Fundamentals">
      <div className="space-y-5">
        {ai_risk && <AIRisk ai_risk={ai_risk} />}

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Current Price">
            <p className="text-2xl font-bold text-blue-600">{token_price ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="24h Low">
            <p className="text-2xl font-bold text-red-600">{low ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="24h High">
            <p className="text-2xl font-bold text-green-600">{high ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="24h Volume">
            <p className="text-2xl font-bold text-purple-600">{volume_24h ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="Market Cap">
            <p className="text-2xl font-bold text-green-600">{market_cap ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        {volume_by_exchange_type_24h && (
          <DetailsItem title="Volume by Exchange Type (24h)">
            <div className="flex items-stretch gap-5 mt-2 md:flex-nowrap flex-wrap">
              <div className="text-center w-full">
                <p className="text-lg font-semibold text-blue-600">
                  {volume_by_exchange_type_24h.CEX}
                </p>
                <p className="text-sm text-gray-500">CEX</p>
              </div>

              <div className="text-center w-full">
                <p className="text-lg font-semibold text-orange-600">
                  {volume_by_exchange_type_24h.DEX}
                </p>
                <p className="text-sm text-gray-500">DEX</p>
              </div>
            </div>
          </DetailsItem>
        )}

        <DetailsItem title="CEX Information">
          <div className="space-y-3 mt-2">
            {cex_info ? cex_info.map((item) => <CexCard key={item.name} {...item} />) : '-'}
          </div>
        </DetailsItem>

        <DetailsItem title="Key Metrics">
          <div className="flex items-stretch mt-2 md:flex-nowrap flex-wrap gap-5">
            <DetailsSubItem title="Total Value Locked (24h)">
              <p className="text-lg font-semibold text-gray-500">
                {total_value_locked_24h ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Unique Active Wallets (24h)">
              <p className="text-lg font-semibold text-gray-500">
                {unique_active_wallets_24h ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="TVL Ratio">
              <p className="text-lg font-semibold text-gray-500">{tvl_ratio ?? 'N/A'}</p>
            </DetailsSubItem>
          </div>
        </DetailsItem>

        <DetailsItem title="7-Day Fundamentals">
          <div className="flex items-stretch mt-2 gap-5 md:flex-nowrap flex-wrap">
            <DetailsSubItem title="Total Active Users (7d)">
              <p className="text-lg font-semibold text-blue-600">
                {formatNumber(total_active_users_7d)}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Token Transferred (7d)">
              <p className="text-lg font-semibold text-green-600">
                {token_transferred_7d ?? 'N/A'}
              </p>
            </DetailsSubItem>

            <DetailsSubItem title="Total Transactions (7d)">
              <p className="text-lg font-semibold text-purple-600">
                {formatNumber(total_transactions_7d)}
              </p>
            </DetailsSubItem>
          </div>
        </DetailsItem>

        <DetailsItem title="AI Analysis Summary">
          <AISummaryText text={ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
