import { AIRIskAnalysisCategory, DomainInfoAnalysis } from '@/lib/_types';
import { formatDate } from '@/lib/utils';

import { AIRisk, AISummaryText } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjectDomain } from '@/lib/api/dashboard';

type Props = {
  tokenAddress: string;
  chainId: string;
  url: string;
};

interface enrichedDataSchema {
  domain: string | null;
  registrar: string | null;
  domain_status: string | null;
  registered_date: any;
  updated_date: any;
  expiry_date: any;
  name_servers: string[];
  ai_summary: string;
}

export const DomainInfo = ({ tokenAddress, chainId, url }: Props) => {
  const [enrichedData, setEnrichedData] = useState<enrichedDataSchema | null>(null);

  const $projectDomainReport = useQuery({
    queryKey: ['project-domain', url], // Include URL in query key for caching
    queryFn: () => getProjectDomain({ url }),
    enabled: !!url, // Only run query if URL exists
    retry: false,
  });

  // Error state
  if ($projectDomainReport.isError) {
    return (
      <p className="text-red-300 font-bold">
        Failed to fetch report status: {$projectDomainReport.error?.message || 'Unknown error'}
      </p>
    );
  }

  const initData = () => {
    if (!$projectDomainReport.data) return;

    const apiData = $projectDomainReport.data;

    const enrichedObject: enrichedDataSchema = {
      domain: apiData.domain || null,
      registrar: apiData.registrar || null,
      domain_status: apiData.domain_status || null,
      registered_date: apiData.registered_date || null,
      updated_date: apiData.updated_date || null,
      expiry_date: apiData.expiry_date || null,
      name_servers: apiData.name_servers || [],
      ai_summary: apiData.ai_summary || '',
    };

    setEnrichedData(enrichedObject);
  };

  useEffect(() => {
    if ($projectDomainReport.isSuccess) {
      initData();
    }
  }, [$projectDomainReport.isSuccess, $projectDomainReport.data]);

  return (
    <DetailsAccordion title="Domain Info">
      <div className="w-full space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}
        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Domain">
            <p className="text-lg font-semibold text-blue-600">{enrichedData?.domain ?? 'N/A'}</p>
          </DetailsItem>
          <DetailsItem title="Registrar">
            <p className="text-lg font-semibold text-gray-600">
              {enrichedData?.registrar ?? 'N/A'}
            </p>
          </DetailsItem>

          <DetailsItem title="Domain Status">
            <p className="text-lg font-semibold text-gray-600">{enrichedData?.domain_status}</p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Registered Date">
            <p className="text-sm font-semibold text-blue-600">
              {formatDate(enrichedData?.registered_date)}
            </p>
          </DetailsItem>

          <DetailsItem title="Updated Date">
            <p className="text-sm font-semibold text-green-600">
              {formatDate(enrichedData?.updated_date)}
            </p>
          </DetailsItem>

          <DetailsItem title="Expiry Date">
            <p className="text-sm font-semibold text-red-600">
              {formatDate(enrichedData?.expiry_date)}
            </p>
          </DetailsItem>
        </div>

        <DetailsItem title="Name Servers">
          {enrichedData?.name_servers && enrichedData?.name_servers.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {enrichedData?.name_servers.map((server, index) => (
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
          <AISummaryText text={enrichedData?.ai_summary ?? ''} />
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
