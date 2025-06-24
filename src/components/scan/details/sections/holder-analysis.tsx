import { AIRIskAnalysisCategory, TokenHolderAnalysis, WhaleMovementIndicator } from '@/lib/_types';
import { formatNumber, whaleMovementIndicatorColors } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

type Props = {
  holderAnalysis: TokenHolderAnalysis;
  ai_risk: AIRIskAnalysisCategory;
};

export const HolderAnalysis = ({
  holderAnalysis: { total_holders, whale_movement_indicator },
  ai_risk,
}: Props) => {
  const indicator = whale_movement_indicator?.toLowerCase() as WhaleMovementIndicator;
  const indicatorColor = whaleMovementIndicatorColors[indicator ?? 'medium'];

  return (
    <DetailsAccordion title="Token holder Analysis">
      <div className="w-full space-y-5">
        {ai_risk && <AIRisk ai_risk={ai_risk} />}

        <div className="w-full flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Total Holders">
            <p className="text-2xl font-bold text-blue-600">{formatNumber(total_holders)}</p>
          </DetailsItem>

          <DetailsItem title="Whale Movement">
            <p className={`text-2xl font-bold ${indicatorColor} first-letter:uppercase`}>
              {whale_movement_indicator}
            </p>
          </DetailsItem>
        </div>
      </div>
    </DetailsAccordion>
  );
};
