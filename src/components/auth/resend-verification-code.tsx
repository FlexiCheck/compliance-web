'use client';

import { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resendCodeAction } from '@/server/actions';

export const ResendVerificationCodeButton = ({ email }: { email: string }) => {
  const [seconds, setSeconds] = useState(60);
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
    mutationKey: ['resend-code'],
    mutationFn: resendCodeAction,
  });

  const handleResend = useCallback(() => {
    $resendCode.mutate(
      {
        email,
      },
      {
        onSuccess: () => {
          toast.success('Verification code resent to your email');
          setSeconds(60);
          setCanResend(false);
        },
        onError: () => {
          toast.error('Failed to resend verification code');
        },
      }
    );
  }, [email, $resendCode]);

  return (
    <div className="w-full flex flex-col items-start my-2">
      <span className="text-xs text-gray-500">
        Didn&apos;t receive the code?{' '}
        {!canResend ? (
          `Resend in 0:${seconds.toString().padStart(2, '0')}`
        ) : (
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
            onClick={handleResend}
            disabled={!canResend}
          >
            Resend
          </button>
        )}
      </span>
    </div>
  );
};
