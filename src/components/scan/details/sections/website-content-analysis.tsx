import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import { WebsiteContentScreening } from '@/lib/_types';

import { AISummaryText } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const ContentScreeningAnalysis = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded">
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{description}</ReactMarkdown>
      {/* <pre className="text-gray-800 text-sm whitespace-pre-line">{description}</pre> */}
    </div>
  );
};

type Props = {
  website_content_screening: WebsiteContentScreening;
};

export const WebsiteContentAnalysis = ({
  website_content_screening: {
    faq_analysis,
    landing_page_analysis,
    cookie_policy_analysis,
    privacy_policy_analysis,
    ai_summary,
  },
}: Props) => {
  return (
    <DetailsAccordion title="Website Content Analysis">
      <div className="w-full space-y-5">
        <DetailsItem title="Website Content Screening">
          <div className="space-y-4">
            <ContentScreeningAnalysis
              title="Landing Page Analysis"
              description={landing_page_analysis ?? '-'}
            />
            <ContentScreeningAnalysis
              title="Privacy Policy Analysis"
              description={privacy_policy_analysis ?? '-'}
            />
            <ContentScreeningAnalysis
              title="Cookie Policy Analysis"
              description={cookie_policy_analysis ?? '-'}
            />
            <ContentScreeningAnalysis title="FAQ Analysis" description={faq_analysis ?? '-'} />
          </div>
        </DetailsItem>

        <DetailsItem title="AI Analysis Summary">
          <AISummaryText text={ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
