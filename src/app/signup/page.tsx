import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo />
          <h1 className="font-headline text-3xl font-bold text-foreground">
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Start managing your real estate portfolio today.
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
