"use client";

import { useRouter } from "next/navigation";
import User from "@/components/home/user";
import HomeForm from "@/components/home/form";
import { authClient } from "@/lib/auth-client";

export default function HomeHeader({ name }: { name: string }) {
  const router = useRouter();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/");
        },
      },
    });
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <User name={name} />
        <button onClick={signOut} className="text-sm">
          Sign Out
        </button>
      </div>
      <HomeForm />
    </div>
  );
}
