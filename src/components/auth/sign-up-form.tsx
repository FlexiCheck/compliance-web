'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { registerAction } from '@/app/server/actions';

import { AuthForm } from './auth-form';

const formSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const $register = useMutation({
    mutationKey: ['register'],
    mutationFn: registerAction,
  });

  const onSubmit = (values: FormValues) => {
    $register.mutate(values, {
      onSuccess: async () => {
        // await setCookieTokens({
        //   accessToken: data.access_token,
        //   refreshToken: data.refresh_token,
        // });
        router.push('/dashboard');
      },
      onError: (error) => {
        form.setError('root', {
          message: 'Failed to register user',
        });
        toast.error(error.message);
      },
    });
  };

  return <AuthForm form={form} onSubmit={onSubmit} isLoading={$register.isPending} />;
};
