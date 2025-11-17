import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/signup-form";
import { getSession } from "@/lib/actions/auth";

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your name, email, and password to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <div className="w-full max-w-md text-sm flex justify-between items-center space-x-8">
        <Link href="/" className="block underline">
          &laquo; Back
        </Link>
        <div>
          Don&apos;t have an account? <Link className="underline" href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
