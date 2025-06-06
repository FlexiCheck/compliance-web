import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

import { ContractRisk, OperationalAnalysis } from '@/lib/_types';
import { formatDate } from '@/lib/utils';

import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

const ContractRiskItem = ({ name, description, severity }: ContractRisk) => {
  return (
    <div className="p-3 bg-gray-50 rounded space-y-1">
      <p className="text-base font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-base font-medium text-gray-600">Severity: {severity}</p>
    </div>
  );
};

type Props = {
  operational: OperationalAnalysis;
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
}: Props) => {
  return (
    <DetailsAccordion title="Operational">
      <div className="w-full space-y-5">
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
              '-'
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
