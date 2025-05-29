import { SignUpForm } from "@/components/auth";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="p-8 rounded-md border bg-white">
        <h2 className="tracking-tight text-2xl font-bold text-center">
          Sign up to Compilance
        </h2>

        <p className="text-sm text-muted-foreground text-center mt-2 mb-5">
          Sign up new account to scan tokens
        </p>

        <SignUpForm />

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-bold">
            sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
