'use client';
import { useQuery } from '@tanstack/react-query';

import { getUserAction } from '@/app/server/actions';
import { Skeleton } from '@/components/ui/skeleton';

export const UserProfile = () => {
  const $user = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserAction,
  });

  return (
    <div className="p-5 bg-white rounded-lg border">
      <h2 className="text-lg font-bold mb-5">User profile</h2>

      <div className="flex items-center gap-2">
        {$user.isLoading ? (
          <>
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-4 w-[200px] rounded-xl" />
          </>
        ) : (
          <>
            <p className="font-semibold">Email: </p>
            <p className="text-shadow-primary">{$user.data?.email}</p>
          </>
        )}
      </div>
    </div>
  );
};
