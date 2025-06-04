import { AdverseMediaAnalysis } from '@/lib/_types';

import { DetailsAccordion } from '../details-accordion';

type Props = {
  adverseMedia: AdverseMediaAnalysis;
};

export const AdverseMedia = ({ adverseMedia }: Props) => {
  return (
    <DetailsAccordion title="Adverse Media">
      <div className="w-full space-y-5">{adverseMedia}</div>
    </DetailsAccordion>
  );
};
