import { z } from "zod";

export const productIndividualUpdateSchema = z.object({
    title: z.string(),
    description: z.string(),
    quantity: z.number().min(0),
    // color: z.string(),
    // size: z.string()
})



 