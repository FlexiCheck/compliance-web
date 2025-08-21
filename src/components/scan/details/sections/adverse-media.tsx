import {
  AdverseMediaAnalysis,
  AdverseMediaSentiment,
  AIRIskAnalysisCategory,
  RiskLevel,
} from '@/lib/_types';
import { adverseMediaSentimentColors, formatDate } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjectAdverseMediaContent } from '@/lib/api/dashboard';

interface MediaItem {
  source: string;
  date: string;
  title: string;
  summary: string;
  url: string;
  sentiment: string;
  risk_level: string;
}

type Props = {
  tokenName: string;
};

interface enrichedDataSchema {
  ai_risk: string | null;
  totalArticles: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  category: string;
  riskLevel: RiskLevel;
  complianceSummary: string;
  mediaItems: MediaItem[];
}

const AdverseMediaArticle = (adverseMedia: MediaItem | null) => {
  const sentiment = adverseMedia?.sentiment?.toLowerCase() as AdverseMediaSentiment;
  const color = adverseMediaSentimentColors[sentiment ?? 'neutral'];

  return (
    <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 flex-1">{adverseMedia?.title}</h4>
        <span
          className={`text-xs px-2 py-1 rounded ml-2 bg-${color}-100 text-${color}-600 first-letter:uppercase`}
        >
          {sentiment}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-medium">{adverseMedia?.source}</span> •{' '}
        {formatDate(adverseMedia?.date)}
      </div>
      <div
        className="text-sm text-gray-700 mb-2"
        dangerouslySetInnerHTML={{ __html: adverseMedia?.summary || '' }}
      />

      {adverseMedia?.url && (
        <a
          href={adverseMedia.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          Read full article
        </a>
      )}
    </div>
  );
};

export const AdverseMedia = ({ tokenName }: Props) => {
  const [enrichedData, setEnrichedData] = useState<enrichedDataSchema | null>(null);

  const $projectAdverseMediaReport = useQuery({
    queryKey: ['project-adverse-media', tokenName], // Include URL in query key for caching
    queryFn: () => getProjectAdverseMediaContent({ tokenName }),
    enabled: !!tokenName, // Only run query if URL exists
    retry: false,
  });

  // Error state
  if ($projectAdverseMediaReport.isError) {
    return (
      <p className="text-red-300 font-bold">
        Failed to fetch report status:{' '}
        {$projectAdverseMediaReport.error?.message || 'Unknown error'}
      </p>
    );
  }

  const initData = () => {
    if (!$projectAdverseMediaReport.data) return;

    const apiData = $projectAdverseMediaReport.data;

    const enrichedObject: enrichedDataSchema = {
      ai_risk: apiData.riskLevel,
      totalArticles: apiData?.totalArticles,
      positivePercentage: apiData?.totalArticles
        ? Math.round((apiData.sentimentDistribution.positive / apiData.totalArticles) * 100)
        : 0,
      negativePercentage: apiData?.totalArticles
        ? Math.round((apiData.sentimentDistribution.negative / apiData.totalArticles) * 100)
        : 0,
      neutralPercentage: apiData?.totalArticles
        ? Math.round((apiData.sentimentDistribution.neutral / apiData.totalArticles) * 100)
        : 0,
      mediaItems: apiData.mediaItems,
      category: apiData.category,
      riskLevel: apiData.riskLevel,
      complianceSummary: apiData.complianceSummary,
    };
    setEnrichedData(enrichedObject);
  };

  useEffect(() => {
    if ($projectAdverseMediaReport.isSuccess) {
      initData();
    }
  }, [$projectAdverseMediaReport.isSuccess, $projectAdverseMediaReport.data]);

  return (
    <DetailsAccordion title="Adverse Media">
      <div className="w-full space-y-5">
        {enrichedData?.ai_risk && (
          <AIRisk
            ai_risk={{
              category: enrichedData?.category,
              risk_level: enrichedData?.riskLevel,
              summary: enrichedData?.complianceSummary,
            }}
          />
        )}

        <DetailsItem title="Total Articles">
          <p className="text-2xl font-bold text-blue-600">{enrichedData?.totalArticles}</p>
        </DetailsItem>

        <DetailsItem title="Total Articles">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">
                {enrichedData?.positivePercentage}%
              </p>
              <p className="text-sm text-gray-500">Positive</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">
                {enrichedData?.neutralPercentage}%
              </p>
              <p className="text-sm text-gray-500">Neutral</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">
                {enrichedData?.negativePercentage}%
              </p>
              <p className="text-sm text-gray-500">Negative</p>
            </div>
          </div>
        </DetailsItem>

        <DetailsItem title="Recent Articles">
          <div className="space-y-3 mt-2">
            {enrichedData?.mediaItems?.map((article) => (
              <AdverseMediaArticle key={article.url} {...article} />
            ))}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
