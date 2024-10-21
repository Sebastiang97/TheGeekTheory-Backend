import { z } from "zod";

export const SubCategoryUpdateSchemaDTO = z.object({
    name: z.string(),
})