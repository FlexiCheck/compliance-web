'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginAction } from '@/app/server/actions';

import { AuthForm } from './auth-form';

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const $login = useMutation({
    mutationKey: ['login'],
    mutationFn: loginAction,
  });

  const onSubmit = async (values: FormValues) => {
    $login.mutate(values, {
      onSuccess: async () => {
        router.push('/dashboard');
      },
      onError: () => {
        form.setError('root', {
          message: 'Incorrect email or password',
        });
        form.setError('email', {});
        form.setError('password', {});
      },
    });
  };

  return <AuthForm form={form} onSubmit={onSubmit} isLoading={$login.isPending} />;
};
