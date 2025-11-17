import { z } from "zod";

const operations = ["plus", "minus", "times", "divide"] as const;

export const nodeSchema = z.object({
  value: z.coerce.number(),
  parentId: z.string().nullish(),
  operation: z.enum(operations).nullish(),
  leftNumber: z.coerce.number().nullish(),
});
