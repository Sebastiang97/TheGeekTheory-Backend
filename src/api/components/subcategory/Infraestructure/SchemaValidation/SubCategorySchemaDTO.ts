import { z } from "zod";

export const imageSchema = z.object({
    id: z.string(),
    url: z.string(),
    SubCategoryId: z.number()
})

export const subCategorySchema = z.object({
    name: z.string(),
    categoryId: z.string()
})