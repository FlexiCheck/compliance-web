'use client';

import { Suspense } from 'react';

import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ResendVerificationLinkButton } from '@/components/auth';

const EmailContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className="bg-white p-8 rounded-md shadow-md flex flex-col items-center max-w-md w-full">
      <MailCheck className="w-12 h-12 text-blue-600 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-center">Check your email</h2>
      <p className="text-gray-600 text-center mb-4">
        We sent a verification link to <span className="font-semibold text-blue-700">{email}</span>.
        <br />
        Please check your inbox and click the link to verify your account.
      </p>
      <ResendVerificationLinkButton email={email} />
      <div className="mt-6 w-full flex justify-center">
        <Link href="/sign-in" className="text-blue-600 hover:underline text-sm">
          &larr; Back to sign in
        </Link>
      </div>
    </div>
  );
};

const CheckEmail = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <Suspense>
        <EmailContent />
      </Suspense>
    </div>
  );
};

export default CheckEmail;
