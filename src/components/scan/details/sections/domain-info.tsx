import { AIRIskAnalysisCategory, DomainInfoAnalysis } from '@/lib/_types';
import { formatDate } from '@/lib/utils';

import { AIRisk, AISummaryText } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';

type Props = {
  domainInfo: DomainInfoAnalysis;
  ai_risk: AIRIskAnalysisCategory;
};

export const DomainInfo = ({
  domainInfo: {
    domain,
    registrar,
    registered_date,
    updated_date,
    expiry_date,
    domain_status,
    name_servers,
    ai_summary,
  },
  ai_risk,
}: Props) => {
  return (
    <DetailsAccordion title="Domain Info">
      <div className="w-full space-y-5">
        {ai_risk && <AIRisk ai_risk={ai_risk} />}
        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Domain">
            <p className="text-lg font-semibold text-blue-600">{domain ?? 'N/A'}</p>
          </DetailsItem>
          <DetailsItem title="Registrar">
            <p className="text-lg font-semibold text-gray-600">{registrar ?? 'N/A'}</p>
          </DetailsItem>

          <DetailsItem title="Domain Status">
            <p className="text-lg font-semibold text-gray-600">{domain_status}</p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Registered Date">
            <p className="text-sm font-semibold text-blue-600">{formatDate(registered_date)}</p>
          </DetailsItem>

          <DetailsItem title="Updated Date">
            <p className="text-sm font-semibold text-green-600">{formatDate(updated_date)}</p>
          </DetailsItem>

          <DetailsItem title="Expiry Date">
            <p className="text-sm font-semibold text-red-600">{formatDate(expiry_date)}</p>
          </DetailsItem>
        </div>

        <DetailsItem title="Name Servers">
          {name_servers && name_servers.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {name_servers.map((server, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {server}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No name servers available</p>
          )}
        </DetailsItem>

        <DetailsItem title="AI Analysis Summary">
          <AISummaryText text={ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
