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

// const noRepeatElements = (elements: {name:string, code:string}[]) => {
//     const uniqueElements = new Set();
//     for (const obj of elements) {
//       const propiedadUnica = obj.code;
//       if (uniqueElements.has(obj.code)) {
//         return false;
//       }
//       uniqueElements.add(propiedadUnica);
//     }
//     return true;
//   };

export const productDTOSchema = z.object({
    name: z.string(),
    price: z.number().refine(value => Number.isFinite(value) && !Number.isInteger(value)),
    subCategoryId: z.string(),
    description: z.string(),
    quantity: z.number().min(0),
    color: z.object({
        code: z.string(),
        name: z.string(),
    }),
    size: z.object({
        code: z.string(),
        name: z.string(),
    })
    // color: z.array(colorSizeDTOSchema).refine(
    //     noRepeatElements, 
    //     {
    //         message: 'El array de objetos no debe contener duplicados por la propiedad code.'
    //     }
    // ),
    // size: z.array(colorSizeDTOSchema).refine(
    //     noRepeatElements, 
    //     {
    //         message: 'El array de objetos no debe contener duplicados por la propiedad code.'
    //     }
    // ),

    // urlImage: z.array(imageSchema)
})



