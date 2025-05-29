import { SignInForm } from "@/components/auth/sign-in-form";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="p-8 rounded-md border bg-white">
        <h2 className="tracking-tight text-2xl font-bold text-center">
          Sign in to Compilance
        </h2>

        <p className="text-sm text-muted-foreground text-center mt-2 mb-5">
          Sign in to your account to analyze crypto tokens
        </p>

        <SignInForm />

        <p className="text-sm text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-bold">
            sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
