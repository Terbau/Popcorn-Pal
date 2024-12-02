import { z, type ZodTypeAny } from "zod";

export const PaginationSchema = <ItemType extends ZodTypeAny>(
  itemSchema: ItemType,
) =>
    z.object({
      results: z.array(itemSchema),
      totalResults: z.number(),
    });
