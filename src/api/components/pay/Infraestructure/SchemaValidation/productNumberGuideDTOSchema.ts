import { z } from "zod";


export const productNumberGuideDTOSchema = z.object({
    numberGuide: z.string(),
})