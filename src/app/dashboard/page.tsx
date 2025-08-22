import ClientDashboard from '@/components/scan/dashboardClient';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const DashboardPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams; // ✅ Await the Promise
  const url = resolvedSearchParams.url;
  const tokenAddress = resolvedSearchParams.tokenAddress;
  const chainId = resolvedSearchParams.chainId;
  const tokenName = resolvedSearchParams.tokenName;

  return (
    <ClientDashboard
      url={url}
      tokenAddress={tokenAddress}
      chainId={chainId}
      tokenName={tokenName}
    />
  );
};

export default DashboardPage;
