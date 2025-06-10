import { Newspaper } from 'lucide-react';

import { EmptyState } from '@/components/ui/empty-state';
import { AdverseMediaAnalysis } from '@/lib/_types';

import { DetailsAccordion } from '../details-accordion';

type Props = {
  adverseMedia: AdverseMediaAnalysis;
};

export const AdverseMedia = ({ adverseMedia }: Props) => {
  return (
    <DetailsAccordion title="Adverse Media">
      {adverseMedia}
      <EmptyState
        icon={Newspaper}
        title="Adverse Media Analysis"
        description="We're currently working on implementing adverse media analysis. This feature will help identify any negative news or reports associated with the token."
      />
    </DetailsAccordion>
  );
};
