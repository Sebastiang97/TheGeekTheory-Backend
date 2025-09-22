import { z } from "zod";

export const ProductUpdateSchema = z.object({
    name: z.string(),
    price: z.number().min(1),
    description: z.string(),
    quantity: z.number().min(0),
    typeStamping: z.string(),
    color: z.string(),
    size: z.string()
})



