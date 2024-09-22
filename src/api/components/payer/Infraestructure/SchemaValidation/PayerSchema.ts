import { z } from "zod";


export const payerDTOSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    zipCode: z.string(),
    detailAddress: z.string(),
})



