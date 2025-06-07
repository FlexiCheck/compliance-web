import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  isScanning: boolean;
};

export const ScanRouteProtection = ({ isScanning }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isScanning) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const handleRouteChange = (url: string) => {
      if (url === pathname) return;

      const confirmed = window.confirm(
        'You have an ongoing token scan. Are you sure you want to leave? Your scan progress will be lost.'
      );

      if (!confirmed) {
        router.push(pathname);
        toast.error('Navigation cancelled', {
          description: 'Please wait for the scan to complete before leaving.',
        });
        throw 'Route change aborted';
      }
    };

    // Handle browser back/forward buttons
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', () => handleRouteChange(pathname));

    // Handle Next.js route changes
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && !link.href.includes(pathname)) {
        e.preventDefault();
        handleRouteChange(link.href);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', () => handleRouteChange(pathname));
      document.removeEventListener('click', handleClick);
    };
  }, [isScanning, router, pathname]);

  return null;
};
