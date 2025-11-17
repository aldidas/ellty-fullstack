"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitial } from "@/lib/utils";

export default function User({ name }: { name: string }) {
  return (
    <div className="flex justify-start items-center space-x-2">
      <Avatar>
        <AvatarFallback className="text-white bg-slate-700">
          {getInitial(name)}
        </AvatarFallback>
      </Avatar>
      <div>{name}</div>
    </div>
  );
}
