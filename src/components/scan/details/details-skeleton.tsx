import { Accordion } from '@radix-ui/react-accordion';

import { Skeleton } from '@/components/ui/skeleton';

export const DetailsSkeleton = () => {
  return (
    <div className="w-full h-full space-y-5">
      <div className="w-full space-y-5">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-3 gap-5">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>

      <Accordion type="single" collapsible>
        <div className="space-y-5 pb-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-3 gap-5">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};
