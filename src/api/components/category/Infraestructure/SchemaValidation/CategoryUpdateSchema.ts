import { z } from "zod";

export const CategoryUpdateSchema = z.object({
    name: z.string(),
})