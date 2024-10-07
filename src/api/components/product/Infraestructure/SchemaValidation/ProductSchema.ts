import { z } from "zod";

export const imageSchema = z.object({
    id: z.string(),
    url: z.string(),
    categoryId: z.number()
})

export const colorSizeDTOSchema = z.object({
    name: z.string(),
    code: z.string(),
})

export const productDTOSchema = z.object({
    name: z.string(),
    price: z.number().min(1),
    subCategoryId: z.string(),
    categoryId: z.string(),
    description: z.string(),
    quantity: z.number().min(0),
    typeStamping: z.string(),
    color: z.string(),
    size: z.string()
})



