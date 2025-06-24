import {
  AIRIskAnalysisCategory,
  SecurityCheckColor,
  SecurityCheckKeys,
  TokenReviewPAnalysis,
} from '@/lib/_types';
import { securityCheckIcons, securityCheckLabels } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

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
  tokenReview: TokenReviewPAnalysis;
  ai_risk: AIRIskAnalysisCategory;
};

export const TokenReview = ({
  tokenReview: { contract, top_10_holders_ratio, ...securityChecks },
  ai_risk,
}: Props) => {
  const securityCheckArray = Object.entries(securityChecks);

  return (
    <DetailsAccordion title="Token Review">
      <div className="space-y-5">
        {ai_risk && <AIRisk ai_risk={ai_risk} />}
        <DetailsItem title="Contract Address">
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
            {contract ?? 'N/A'}
          </div>
        </DetailsItem>

        <DetailsItem title="Top 10 Holders Ratio">
          <p className="text-lg font-semibold text-orange-600">{top_10_holders_ratio ?? 'N/A'}</p>
        </DetailsItem>

        <DetailsItem title="Security Checks">
          <div className="space-y-2 mt-2">
            {securityCheckArray.map(([key, value]) => {
              const label = securityCheckLabels[key as SecurityCheckKeys];

              return (
                value !== null &&
                label && <SecurityCheckItem key={key} title={label} checkItem={value} />
              );
            })}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
