import Link from "next/link";
import { getSession } from "@/lib/actions/auth";
import { getAllNodes } from "@/lib/actions/tree";
import HomeHeader from "@/components/home/header";
import Tree from "@/components/home/tree";

export default async function Home() {
  const session = await getSession();
  const treeData = await getAllNodes();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start p-8 bg-white dark:bg-black sm:items-start">
        {session ? (
          <HomeHeader name={session.user.name} />
        ) : (
         <Link
            href="/auth/signin"
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            Submit a number to start a conversation
          </Link>
        )}
        <div className="mt-8 border rounded-md p-4 pl-0 w-full">
          <Tree treeData={treeData} />
        </div>
      </main>
    </div>
  );
}
