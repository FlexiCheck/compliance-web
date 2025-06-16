import { AdverseMediaAnalysis, AdverseMediaSentiment } from '@/lib/_types';
import { adverseMediaSentimentColors, formatDate } from '@/lib/utils';

import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const AdverseMediaArticle = (adverseMedia: AdverseMediaAnalysis | null) => {
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
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: adverseMedia?.summary || '' }}
      />
    </div>
  );
};

type Props = {
  adverseMedias: AdverseMediaAnalysis[] | null;
};

export const AdverseMedia = ({ adverseMedias }: Props) => {
  const total = adverseMedias?.length || 0;
  const positive = adverseMedias?.filter((article) => article.sentiment === 'positive').length || 0;
  const neutral = adverseMedias?.filter((article) => article.sentiment === 'neutral').length || 0;
  const negative = adverseMedias?.filter((article) => article.sentiment === 'negative').length || 0;

  const positivePercentage = total ? Math.round((positive / total) * 100) : 0;
  const neutralPercentage = total ? Math.round((neutral / total) * 100) : 0;
  const negativePercentage = total ? Math.round((negative / total) * 100) : 0;

  return (
    <DetailsAccordion title="Adverse Media">
      <div className="w-full space-y-5">
        <DetailsItem title="Total Articles">
          <p className="text-2xl font-bold text-blue-600">{total}</p>
        </DetailsItem>

        <DetailsItem title="Total Articles">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">{positivePercentage}%</p>
              <p className="text-sm text-gray-500">Positive</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">{neutralPercentage}%</p>
              <p className="text-sm text-gray-500">Neutral</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">{negativePercentage}%</p>
              <p className="text-sm text-gray-500">Negative</p>
            </div>
          </div>
        </DetailsItem>

        <DetailsItem title="Recent Articles">
          <div className="space-y-3 mt-2">
            {adverseMedias?.map((article) => (
              <AdverseMediaArticle key={article.url} {...article} />
            ))}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
