import Link from 'next/link';

import { SignUpForm } from '@/components/auth';

const SignUpPage = () => {
  return (
    <div className="container h-screen flex items-center justify-center max-w-[400px]">
      <div className="p-8 rounded-md border bg-white">
        <h2 className="tracking-tight text-2xl font-bold text-center">Sign up to Compliance</h2>

        <p className="text-sm text-muted-foreground text-center mt-2 mb-5">
          Sign up new account to scan tokens
        </p>

        <SignUpForm />

        <p className="text-sm text-center mt-3">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-bold">
            sign in
          </Link>{' '}
        </p>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By creating an account, you confirm that you&apos;ve read and agree to our{' '}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="underline hover:text-primary">
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
