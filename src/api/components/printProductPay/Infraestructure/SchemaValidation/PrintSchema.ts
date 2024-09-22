import { z } from "zod";

export const printSchemaDTO = z.object({
    name: z.string(),
    author: z.string(),
    isMain: z.string()
})