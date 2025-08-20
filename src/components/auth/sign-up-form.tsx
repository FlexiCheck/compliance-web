'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useState } from 'react';

import { AuthForm } from './auth-form';
import { registerAction } from '@/lib/api/auth';
import { OtpModal } from './otp-modal';

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 chars')
      .transform((val) => val.toLowerCase()),
    email: z
      .string()
      .trim()
      .email('Invalid email')
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 chars')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/[0-9]/, 'Must contain number')
      .regex(/[^A-Za-z0-9]/, 'Must contain special char'),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const router = useRouter();
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  const form = useForm<FormValues>({
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
    resolver: zodResolver(formSchema),
  });

  const $register = useMutation({
    mutationKey: ['register'],
    mutationFn: registerAction,
  });

  const onSubmit = (values: FormValues) => {
    $register.mutate(values, {
      onSuccess: ({ message }) => {
        // This is the normal, successful sign-up flow
        toast.success(message || 'Sign up successful! Please verify your OTP.');
        setOtpEmail(values.email);
        setOtpModalOpen(true);
      },
      // --- THIS IS THE CRITICAL CHANGE ---
      onError: (error: any) => {
        // Check if the error object we created has a status of 409
        if (error.status === 409) {
          // If yes, show a helpful message and open the OTP modal
          toast.info('This email is already registered. Please verify your OTP to continue.');
          setOtpEmail(values.email);
          setOtpModalOpen(true);
        } else {
          // For all other errors, show a generic message in the form
          form.setError('root', { message: error.message || 'An unknown error occurred.' });
        }
      },
    });
  };

  return (
    <>
      <AuthForm form={form} onSubmit={onSubmit} isLoading={$register.isPending} mode="signup" />

      <OtpModal
        email={otpEmail}
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSuccess={() => router.push('/sign-in')}
      />
    </>
  );
};
