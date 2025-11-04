import { z } from "zod";

export const tagSchema = z.object({
    name: z.string(),
    displayName: z.string()
})