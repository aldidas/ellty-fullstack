"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeFormProps {
  parentId?: number;
  parentValue?: number;
}

export default function HomeForm({ parentId, parentValue }: HomeFormProps) {
  return (
    <form className="mt-8 flex space-x-2 justify-between items-center">
      {parentId && parentValue && (
        <>
          <Input
            disabled
            name="value"
            type="text"
            placeholder="number"
            className="w-[180px]"
            defaultValue={parentValue}
          />
          <Select>
            <SelectTrigger className="w-[180px]">
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
        </>
      )}
      <Input
        id="value"
        name="value"
        type="text"
        placeholder="number"
        defaultValue=""
      />
      <Button type="submit" size="sm">
        Send
      </Button>
    </form>
  );
}
