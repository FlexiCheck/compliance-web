import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getCachedTokenReport } from '@/app/server/actions/token';
import { TokenDetails } from '@/components/scan/details';
import { getQueryClient } from '@/lib/query';

const DashboardPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cached-report'],
    queryFn: getCachedTokenReport,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TokenDetails />
    </HydrationBoundary>
  );
};

export default DashboardPage;
