import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { UserProfile } from '@/components/user-profile';
import { getQueryClient } from '@/lib/query';
import { getUserAction } from '@/server/actions';

const ProfilePage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user-details'],
    queryFn: () => getUserAction(),
  });

  return (
    <div className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile />
      </HydrationBoundary>
    </div>
  );
};

export default ProfilePage;
