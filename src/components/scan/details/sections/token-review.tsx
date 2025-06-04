import { SecurityCheckKeys, TokenReviewPAnalysis } from '@/lib/_types';
import { securityCheckLabels } from '@/lib/utils';

import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const SecurityCheckItem = ({ title, checked }: { title: string; checked: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium text-base">{title}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold">{checked ? 'Yes' : 'No'}</span>
      </div>
    </div>
  );
};

type Props = {
  tokenReview: TokenReviewPAnalysis;
};

export const TokenReview = ({
  tokenReview: {
    contract,
    major_holders_ratio,
    top_10_holders_ratio,
    buy_tax,
    sell_tax,
    ...securityChecks
  },
}: Props) => {
  const securityCheckArray = Object.entries(securityChecks);

  return (
    <DetailsAccordion title="Token Review">
      <div className="space-y-5">
        <DetailsItem title="Contract Address">
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
            {contract ?? 'N/A'}
          </div>
        </DetailsItem>

        <div className="grid grid-cols-2 gap-5">
          <DetailsItem
            title="Major Holders Ratio"
            subContent={
              <p className="text-xs text-gray-500 mt-1">
                Check if the current holding is centralized
              </p>
            }
          >
            <p className="text-lg font-semibold text-orange-600">{major_holders_ratio ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="Top 10 Holders Ratio">
            <p className="text-lg font-semibold text-orange-600">{top_10_holders_ratio ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem
            title="Buy Tax"
            subContent={<p className="text-xs text-gray-500 mt-1">Above 5% is considered high</p>}
          >
            <p className="text-lg font-semibold text-green-600">{buy_tax ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem
            title="Sell Tax"
            subContent={<p className="text-xs text-gray-500 mt-1">Above 5% is considered high</p>}
          >
            <p className="text-lg font-semibold text-green-600">{sell_tax ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        <DetailsItem title="Security Checks">
          <div className="space-y-2 mt-2">
            {securityCheckArray.map(([key, value]) => {
              const label = securityCheckLabels[key as SecurityCheckKeys];

              return (
                value !== null &&
                label && <SecurityCheckItem key={key} title={label} checked={value} />
              );
            })}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
