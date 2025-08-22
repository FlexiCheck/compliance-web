import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

import {
  AIRIskAnalysisCategory,
  ContactRiskSeverity,
  ContractRisk,
  OperationalAnalysis,
  RiskLevel,
} from '@/lib/_types';
import { contactRiskSeverityUtils, formatDate } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActiveUsersAndTransactions, fetchDeployDate } from '@/lib/api/coin-gecko';

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
  operational: {
    contract_address: string | null;
    active_users_24h: string | null;
    transactions_24h: string | null;
    gas_consumed_24h: string | null;
    contract_risks: Array<{
      name: string;
      severity: any;
      description: string;
    }> | null;
  } | null;
  tokenAddress: string;
  chainId: string;
};

interface ContractRisks {
  name: string | null;
  severity: RiskLevel;
  description: string | null;
}
interface enrichedDataSchema {
  contract_address: string | null;
  active_users_24h: string | null;
  transactions_24h: string | null;
  gas_consumed_24h: string | null;
  deploy_date: string | null;
  details_url: string | null;
  contract_risks: ContractRisks[] | null | undefined;
}

const needsMoralisApiOneData = (data: enrichedDataSchema | null): boolean => {
  if (!data) return false;
  return !data.active_users_24h || !data.transactions_24h;
};

const needsMoralisApiTwoData = (data: enrichedDataSchema | null): boolean => {
  if (!data) return false;
  return !data.deploy_date;
};

export const Operational = ({ operational, tokenAddress, chainId }: Props) => {
  const [enrichedData, setEnrichedData] = useState<enrichedDataSchema | null>(null);
  const [hasUpdatedMoralisOne, setHasUpdatedMoralisOne] = useState(false);
  const [hasUpdatedMoralisTwo, setHasUpdatedMoralisTwo] = useState(false);

  const createInitialData = (): enrichedDataSchema => {
    return {
      contract_address: tokenAddress,
      active_users_24h: operational?.active_users_24h || null,
      transactions_24h: operational?.transactions_24h || null,
      gas_consumed_24h: operational?.gas_consumed_24h || null,
      deploy_date: null,
      details_url: null,
      contract_risks: operational?.contract_risks,
    };
  };

  const shouldFetchMoralisApiOne: boolean =
    (enrichedData && needsMoralisApiOneData(enrichedData)) || false;
  const shouldFetchMoralisApiTwo: boolean =
    (enrichedData && needsMoralisApiTwoData(enrichedData)) || false;

  const updateWithMoralisApiOneData = (moralApiOneResponse: any) => {
    if (!enrichedData || hasUpdatedMoralisOne) return;
    const updatedData = { ...enrichedData };

    if (!updatedData.active_users_24h && moralApiOneResponse.uniqueWallets['24h']) {
      updatedData.active_users_24h = moralApiOneResponse.uniqueWallets['24h'];
    }

    if (
      !updatedData.transactions_24h &&
      moralApiOneResponse.totalSells['24h'] &&
      moralApiOneResponse.totalBuys['24h']
    ) {
      updatedData.transactions_24h =
        moralApiOneResponse.totalSells['24h'] + moralApiOneResponse.totalBuys['24h'];
    }

    setEnrichedData(updatedData);
    setHasUpdatedMoralisOne(true);
  };

  const updateWithMoralisApiTwoData = (moralApiTwoResponse: any) => {
    if (!enrichedData || hasUpdatedMoralisTwo) return;
    const updatedData = { ...enrichedData };

    if (!updatedData.deploy_date && moralApiTwoResponse[0].created_at) {
      updatedData.deploy_date = moralApiTwoResponse[0].created_at;
    }
    setEnrichedData(updatedData);
    setHasUpdatedMoralisTwo(true);
  };

  // Initialize enriched data
  useEffect(() => {
    const initialData = createInitialData();
    setEnrichedData(initialData);
    setHasUpdatedMoralisOne(false);
    setHasUpdatedMoralisTwo(false);
  }, [operational]);

  const {
    data: moralisDataOne,
    isLoading: isLoadingMoralisOne,
    error: errorMoralisOne,
    isSuccess: isSuccessMoralisOne,
  } = useQuery({
    queryKey: ['moralis-operational-one', tokenAddress, chainId],
    queryFn: () => fetchActiveUsersAndTransactions(tokenAddress, chainId),
    enabled: shouldFetchMoralisApiOne,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  const {
    data: moralisDataTwo,
    isLoading: isLoadingMoralisTwo,
    error: errorMoralisTwo,
    isSuccess: isSuccessMoralisTwo,
  } = useQuery({
    queryKey: ['moralis-operational-two', tokenAddress, chainId],
    queryFn: () => fetchDeployDate(tokenAddress, chainId),
    enabled: shouldFetchMoralisApiTwo,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Update enriched data when Moralis data is available
  useEffect(() => {
    if (isSuccessMoralisOne && moralisDataOne) {
      updateWithMoralisApiOneData(moralisDataOne);
    }
  }, [isSuccessMoralisOne, moralisDataOne]);

  // Update enriched data when Moralis data is available
  useEffect(() => {
    if (isSuccessMoralisTwo && moralisDataTwo) {
      updateWithMoralisApiTwoData(moralisDataTwo);
    }
  }, [isSuccessMoralisTwo, moralisDataTwo]);

  useEffect(() => {
    if (errorMoralisOne) {
      console.error('Moralis API error:', errorMoralisOne);
    }
  }, [errorMoralisOne]);

  useEffect(() => {
    if (errorMoralisTwo) {
      console.error('Moralis API error:', errorMoralisTwo);
    }
  }, [errorMoralisTwo]);

  return (
    <DetailsAccordion title="Operational">
      <div className="w-full space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}

        <DetailsItem title="Contract address">
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all mt-1">
            {enrichedData?.contract_address ?? 'N/A'}
          </div>
        </DetailsItem>

        <div className="flex items-stretch gap-5 md:flex-nowrap flex-wrap">
          <DetailsItem title="Active Users (24h)">
            <p className="text-lg font-semibold text-blue-600">
              {enrichedData?.active_users_24h ?? 'N/A'}
            </p>
          </DetailsItem>

          <DetailsItem title="Transactions (24h)">
            <p className="text-lg font-semibold text-green-600">
              {enrichedData?.transactions_24h ?? 'N/A'}
            </p>
          </DetailsItem>

          <DetailsItem title="Gas Consumed (24h)">
            <p className="text-lg font-semibold text-purple-600">
              {enrichedData?.gas_consumed_24h ?? 'N/A'}
            </p>
          </DetailsItem>
        </div>

        <div className="flex items-stretch gap-5">
          <DetailsItem title="Deploy Date">
            <p className="text-lg font-semibold text-gray-800">
              {formatDate(enrichedData?.deploy_date)}
            </p>
          </DetailsItem>

          <DetailsItem title="Details">
            {enrichedData?.details_url ? (
              <Link
                href={enrichedData?.details_url}
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
            {enrichedData?.contract_risks && enrichedData?.contract_risks.length > 0
              ? enrichedData?.contract_risks.map((contract_risk) => (
                  <ContractRiskItem key={contract_risk.name} {...contract_risk} />
                ))
              : '-'}
          </div>
        </DetailsItem>
      </div>
    </DetailsAccordion>
  );
};
