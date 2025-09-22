import { z } from "zod";

export const productDTOSchema = z.object({
    categoryId: z.string(),
    subCategoryId: z.string(),
    color: z.string(),
    size: z.string(),
    description: z.string(),
    isVisible: z.boolean(),
    quantity: z.number().min(1),
    title: z.string(),
})