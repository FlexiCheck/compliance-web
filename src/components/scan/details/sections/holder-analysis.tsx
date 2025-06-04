import { TokenHolderAnalysis } from '@/lib/_types';
import { formatNumber } from '@/lib/utils';

import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

type Props = {
  holderAnalysis: TokenHolderAnalysis;
};

export const HolderAnalysis = ({
  holderAnalysis: { total_holders, whale_movement_indicator },
}: Props) => {
  return (
    <DetailsAccordion title="Token holder Analysis">
      <div className="w-full flex items-stretch gap-5">
        <DetailsItem title="Total Holders">
          <p className="text-2xl font-bold text-blue-600">{formatNumber(total_holders)}</p>
        </DetailsItem>

        <DetailsItem title="Whale Movement">
          <p className="text-2xl font-bold text-gray-600">{whale_movement_indicator}</p>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
