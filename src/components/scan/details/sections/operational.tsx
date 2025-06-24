import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

import {
  AIRIskAnalysisCategory,
  ContactRiskSeverity,
  ContractRisk,
  OperationalAnalysis,
} from '@/lib/_types';
import { contactRiskSeverityUtils, formatDate } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const ContractRiskItem = ({ name, description, severity }: ContractRisk) => {
  const severityKey = severity?.toLowerCase() as ContactRiskSeverity;
  const { Icon, color } = contactRiskSeverityUtils[severityKey ?? 'medium'];

  return (
    <div className="p-3 bg-gray-50 rounded space-y-1">
      <div className="flex items-center gap-3">
        <Icon className={`size-4 ${color}`} />
        <p className="text-base font-medium text-gray-900">{name}</p>
        <p className={`text-xs ${color}`}>{severity}</p>
      </div>
      <p className="text-sm text-gray-600 ml-7">{description ?? '-'}</p>
    </div>
  );
};

type Props = {
  operational: OperationalAnalysis;
  ai_risk: AIRIskAnalysisCategory;
};

export const Operational = ({
  operational: {
    contract_address,
    active_users_24h,
    transactions_24h,
    gas_consumed_24h,
    deploy_date,
    details_url,
    contract_risks,
  },
  ai_risk,
}: Props) => {
  return (
    <DetailsAccordion title="Operational">
      <div className="w-full space-y-5">
        {ai_risk && <AIRisk ai_risk={ai_risk} />}

        <DetailsItem title="Contract address">
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
            {contract_address ?? 'N/A'}
          </div>
        </DetailsItem>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Active Users (24h)">
            <p className="text-lg font-semibold text-blue-600">{active_users_24h ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="Transactions (24h)">
            <p className="text-lg font-semibold text-green-600">{transactions_24h ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="Gas Consumed (24h)">
            <p className="text-lg font-semibold text-purple-600">{gas_consumed_24h ?? 'N/A'}</p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5">
          <DetailsItem title="Deploy Date">
            <p className="text-lg font-semibold text-gray-800">{formatDate(deploy_date)}</p>
          </DetailsItem>

          <DetailsItem title="Details">
            {details_url ? (
              <Link
                href={details_url}
                target="_blank"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <LucideExternalLink size={16} /> View details
              </Link>
            ) : (
              <p className="text-lg font-semibold text-gray-800">N/A</p>
            )}
          </DetailsItem>
        </div>

        <DetailsItem title="Contract Risks">
          <div className="space-y-3 mt-2">
            {contract_risks && contract_risks.length > 0
              ? contract_risks.map((contract_risk) => (
                  <ContractRiskItem key={contract_risk.name} {...contract_risk} />
                ))
              : '-'}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
