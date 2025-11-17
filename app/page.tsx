import Link from "next/link";
import { getSession } from "@/lib/actions/auth";
import HomeHeader from "@/components/home/header";

export default async function Home() {
  const session = await getSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start p-8 bg-white dark:bg-black sm:items-start">
        {session ? (
          <HomeHeader name={session.user.name} />
        ) : (
          <Link
            href="/auth/signin"
            className="w-full px-4 py-2 border rounded-md"
          >
            Submit
          </Link>
        )}
        <div className="mt-8 border rounded-md p-4 w-full">Tree Content</div>
      </main>
    </div>
  );
}
