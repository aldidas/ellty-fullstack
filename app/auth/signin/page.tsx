import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/components/auth/signin-form';

export default function SigninPage() {
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
      <div className="text-sm">
        Don&apos;t have an account? <Link className="underline" href="/auth/signup">Sign Up</Link>
      </div>
    </div>
  );
}
