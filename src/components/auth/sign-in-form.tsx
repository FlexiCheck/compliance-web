'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthForm } from './auth-form';
import { ResendVerificationLinkButton } from './resend-verification-link';
import { loginAction } from '@/lib/api/auth';

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const [isUserVerified, setIsUserVerified] = useState(true);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(formSchema),
  });

  const email = form.watch('email');

  const $login = useMutation<any, any, FormValues>({
    mutationFn: loginAction,
    onSuccess: () => {
      setTimeout(() => {
        window.location.replace('/dashboard');
      }, 100);
    },
    onError: (error: any) => {
      if (error.message === 'User not active') setIsUserVerified(false);
      form.setError('root', { message: error.message });
      form.setError('email', {});
      form.setError('password', {});
    },
  });

  const onSubmit = (values: FormValues) => $login.mutate(values);

  return (
    <div className="flex flex-col gap-3">
      <AuthForm form={form} onSubmit={onSubmit} mode="signin" />
      {!isUserVerified && email && <ResendVerificationLinkButton email={email} defaultTime={0} />}
    </div>
  );
};
