'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter, useSearchParams } from 'next/navigation';

import { ResendVerificationCodeButton } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { loginVerifyAction } from '@/server/actions';

const LoginVerify = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const $loginVerify = useMutation({
    mutationKey: ['login'],
    mutationFn: loginVerifyAction,
  });

  const onSubmit = async () => {
    setError('');
    $loginVerify.mutate(
      { email, code: value },
      {
        onSuccess: async () => {
          router.push('/dashboard');
        },
        onError: () => {
          setError('Incorrect code');
        },
      }
    );
  };

  return (
    <div className="container h-screen flex items-center justify-center p-5">
      <div className="border bg-white rounded-md p-5 flex flex-col items-center justify-center gap-5 max-w-[400px]">
        <h2 className="font-bold max-w-[336px]">
          Enter the 6-digit code we sent to your email to verify your address.
        </h2>
        <input
          type="email"
          value={email}
          disabled
          className="mb-4 w-full px-3 py-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
        />
        <div>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={`otp-slot-${index}`}
                  index={index}
                  className={cn('h-14 w-14 text-xl', {
                    'border-red-500': error,
                  })}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
        <ResendVerificationCodeButton email={email} />
        <Button className="w-full" onClick={onSubmit} disabled={!email || value.length < 6}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default LoginVerify;
