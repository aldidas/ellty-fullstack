import { redirect } from "next/navigation";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/components/auth/signin-form';
import { getSession } from "@/lib/actions/auth";

export default async function SigninPage() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <div className="w-full max-w-md text-sm flex justify-between items-center space-x-8">
        <Link href="/" className="block underline">
          &laquo; Back
        </Link>
        <div>
          Don&apos;t have an account? <Link className="underline" href="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
