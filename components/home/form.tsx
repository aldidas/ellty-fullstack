"use client";

import { useActionState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNode } from "@/lib/actions/tree";
import { initialState } from "@/lib/utils";

interface HomeFormProps {
  parentId?: string;
  parentValue?: number;
  onSuccess?: () => void;
}

export default function HomeForm({
  parentId,
  parentValue,
  onSuccess,
}: HomeFormProps) {
  const [state, action, isPending] = useActionState(createNode, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "SUCCESS") {
      formRef.current?.reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state, onSuccess]);

  return (
    <form
      ref={formRef}
      action={action}
      className="mt-4 flex flex-col space-y-4 p-4 border rounded-md bg-gray-50"
    >
      {parentValue !== undefined && (
        <p className="text-sm text-gray-600">
          Replying to node with value: <strong>{parentValue}</strong>
        </p>
      )}
      <div className="flex space-x-2">
        {parentId && parentValue && (
          <Select name="operation" required>
            <SelectTrigger>
              <SelectValue placeholder="Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xl" value="plus">
                ⊕
              </SelectItem>
              <SelectItem className="text-xl" value="minus">
                ⊖
              </SelectItem>
              <SelectItem className="text-xl" value="times">
                ⊗
              </SelectItem>
              <SelectItem className="text-xl" value="divide">
                ⨸
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        <Input
          id="value"
          name="value"
          type="text"
          placeholder="Enter a number"
          required
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </div>
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      {state?.errors && (
        <div className="text-red-500 text-sm">
          <ul>
            {Object.entries(state.errors).map(([key, errors]) =>
              errors?.map((error) => <li key={`${key}-${error}`}>{error}</li>),
            )}
          </ul>
        </div>
      )}
      {state?.message && state.status === "ERROR" && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}