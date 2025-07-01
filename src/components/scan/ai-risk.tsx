import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import { AIRIskAnalysisCategory, RiskLevel } from '@/lib/_types';

export const AISummaryText = ({ text }: { text: string }) => {
  return <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{text}</ReactMarkdown>;
};

type Props = {
  ai_risk: AIRIskAnalysisCategory;
};

// Define this mapping outside your component
export const riskLevelStyles = {
  low: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-600',
    Icon: CircleCheck,
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
    icon: 'text-yellow-600',
    Icon: TriangleAlert,
  },
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-600',
    Icon: CircleX,
  },
};

export const AIRisk = ({ ai_risk }: Props) => {
  const riskLevel = ai_risk.risk_level?.toLowerCase() as RiskLevel;

  const styles = riskLevelStyles[riskLevel ?? 'medium'];

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${styles.text}`}>Category: {ai_risk.category}</span>
          <div className="flex items-center gap-2">
            <styles.Icon size="16" className={styles.icon} />
            <span className={`text-sm font-medium ${styles.icon}`}>
              Risk Level: {ai_risk.risk_level}
            </span>
          </div>
        </div>
      </div>
      <AISummaryText text={ai_risk.summary ?? ''} />
    </div>
  );
};
