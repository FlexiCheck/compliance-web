import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import { WebsiteContentScreening } from '@/lib/_types';

import { AISummaryText } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjectWebContent } from '@/lib/api/dashboard';

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
  url: string;
};

interface enrichedDataSchema {
  faq_analysis: string | null;
  landing_page_analysis: string | null;
  cookie_policy_analysis: string | null;
  privacy_policy_analysis: any;
  ai_summary: any;
}

export const WebsiteContentAnalysis = ({ url }: Props) => {
  const [enrichedData, setEnrichedData] = useState<enrichedDataSchema | null>(null);

  const $projectWebContentReport = useQuery({
    queryKey: ['project-web-content', url], // Include URL in query key for caching
    queryFn: () => getProjectWebContent({ url }),
    enabled: !!url, // Only run query if URL exists
    retry: false,
  });

  // Error state
  if ($projectWebContentReport.isError) {
    return (
      <p className="text-red-300 font-bold">
        Failed to fetch report status: {$projectWebContentReport.error?.message || 'Unknown error'}
      </p>
    );
  }

  const initData = () => {
    if (!$projectWebContentReport.data) return;

    const apiData = $projectWebContentReport.data;

    const enrichedObject: enrichedDataSchema = {
      faq_analysis: apiData.faqAnalysis,
      landing_page_analysis: apiData.landingPageAnalysis,
      cookie_policy_analysis: apiData.cookiePolicyAnalysis,
      privacy_policy_analysis: apiData.privacyPolicyAnalysis,
      ai_summary: apiData.aiSummary,
    };

    setEnrichedData(enrichedObject);
  };

  useEffect(() => {
    if ($projectWebContentReport.isSuccess) {
      initData();
    }
  }, [$projectWebContentReport.isSuccess, $projectWebContentReport.data]);

  return (
    <DetailsAccordion title="Website Content Analysis">
      <div className="w-full space-y-5">
        <DetailsItem title="Website Content Screening">
          <div className="space-y-4">
            <ContentScreeningAnalysis
              title="Landing Page Analysis"
              description={enrichedData?.landing_page_analysis ?? '-'}
            />
            <ContentScreeningAnalysis
              title="Privacy Policy Analysis"
              description={enrichedData?.privacy_policy_analysis ?? '-'}
            />
            <ContentScreeningAnalysis
              title="Cookie Policy Analysis"
              description={enrichedData?.cookie_policy_analysis ?? '-'}
            />
            <ContentScreeningAnalysis
              title="FAQ Analysis"
              description={enrichedData?.faq_analysis ?? '-'}
            />
          </div>
        </DetailsItem>

        <DetailsItem title="AI Analysis Summary">
          <AISummaryText text={enrichedData?.ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
