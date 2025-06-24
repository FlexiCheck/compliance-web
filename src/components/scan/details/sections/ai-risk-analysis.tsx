import { AIRIskAnalysisCategory, AIRiskANalysisSummary, RiskLevel } from '@/lib/_types';
import { formatDate } from '@/lib/utils';

import { riskLevelStyles } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const AIRiskCategoryItem = ({ item }: { item: AIRIskAnalysisCategory }) => {
  const riskLevel = item.risk_level?.toLowerCase() as RiskLevel;

  const styles = riskLevelStyles[riskLevel ?? 'medium'];

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
      <styles.Icon size="16" className={`mt-1 ${styles.text}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">Token Overview</span>
          <span className={`text-xs px-2 py-1 rounded ${styles.text} bg-opacity-10 ${styles.bg}`}>
            {item.risk_level}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          BNB has a high market cap and 24h volume, indicating strong market presence and liquidity.
        </div>
      </div>
    </div>
  );
};

type Props = {
  ai_risk_analysis: AIRiskANalysisSummary;
};

export const AiRiskAnalysis = ({
  ai_risk_analysis: { overall_risk_assessment, categories, analysis_timestamp },
}: Props) => {
  return (
    <DetailsAccordion title="AI Risk Analysis Summary">
      <div className="w-full space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700 text-center">{overall_risk_assessment ?? '-'}</p>
        </div>

        <DetailsItem title="Risk Analysis by Category">
          <div className="space-y-4 mt-2">
            {categories?.map((category) => (
              <AIRiskCategoryItem key={category.category} item={category} />
            ))}
          </div>
        </DetailsItem>

        <DetailsItem title="Analysis Timestamp">
          <p className="text-sm font-mono text-gray-800">
            {formatDate(analysis_timestamp, { dateTime: true })}
          </p>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
