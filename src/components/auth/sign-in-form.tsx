'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginAction } from '@/server/actions';

import { AuthForm } from './auth-form';
import { ResendVerificationLinkButton } from './resend-verification-link';

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const [isUserVerified, setIsUserVerified] = useState(true);

  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const email = form.watch('email');

  const $login = useMutation({
    mutationKey: ['login'],
    mutationFn: loginAction,
  });

  const onSubmit = async (values: FormValues) => {
    $login.mutate(values, {
      onSuccess: async () => {
        router.push('/dashboard');
      },
      onError: ({ message }) => {
        if (message === 'User not active') {
          setIsUserVerified(false);
        }
        form.setError('root', {
          message,
        });
        form.setError('email', {});
        form.setError('password', {});
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <AuthForm form={form} onSubmit={onSubmit} isLoading={$login.isPending} />
      {!isUserVerified && email && <ResendVerificationLinkButton email={email} defaultTime={0} />}
    </div>
  );
};
