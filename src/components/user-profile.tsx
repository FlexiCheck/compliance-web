'use client';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';

import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserAction } from '@/server/actions';

export const UserProfile = () => {
  const $user = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserAction,
  });

  if ($user.isLoading) {
    return (
      <div className="p-5 bg-white rounded-lg border">
        <h2 className="text-lg font-bold mb-5">User profile</h2>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-xl" />
          <Skeleton className="h-4 w-[200px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!$user.data) {
    return (
      <EmptyState
        icon={User}
        title="No User Profile"
        description="We couldn't load your user profile. Please try refreshing the page or contact support if the issue persists."
      />
    );
  }

  return (
    <div className="p-5 bg-white rounded-lg border">
      <h2 className="text-lg font-bold mb-5">User profile</h2>
      <div className="flex items-center gap-2">
        <p className="font-semibold">Email: </p>
        <p className="text-shadow-primary">{$user.data?.email}</p>
      </div>
    </div>
  );
};
