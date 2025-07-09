'use client';

import { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resendVerificationLinkAction } from '@/server/actions';

import { Button } from '../ui/button';

export const ResendVerificationLinkButton = ({
  email,
  defaultTime,
}: {
  email: string;
  defaultTime?: number;
}) => {
  const [seconds, setSeconds] = useState(defaultTime ?? 60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [seconds]);

  const $resendCode = useMutation({
    mutationKey: ['resend-link'],
    mutationFn: resendVerificationLinkAction,
  });

  const handleResend = useCallback(() => {
    $resendCode.mutate(
      {
        email,
      },
      {
        onSuccess: () => {
          toast.success('Verification link resent to your email');
          setSeconds(60);
          setCanResend(false);
        },
        onError: () => {
          toast.error('Failed to resend verification link');
        },
      }
    );
  }, [$resendCode, email]);

  return (
    <div className="w-full flex flex-col items-center my-2">
      <p className="text-xs text-gray-500">Didn&apos;t receive the email? </p>
      <Button
        type="button"
        variant="ghost"
        className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
        onClick={handleResend}
        disabled={!canResend}
      >
        {!canResend ? `Resend in 0:${seconds.toString().padStart(2, '0')}` : 'Resend'}
      </Button>
    </div>
  );
};
