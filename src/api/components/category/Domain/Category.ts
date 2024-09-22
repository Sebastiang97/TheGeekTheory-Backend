import { BaseEntity } from "../../common/Domain/BaseEntity";
import { SubCategory } from "../../subcategory/Domain/SubCategory";

export class Category extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        // public code: string,
        public subCategories?: SubCategory[],
    ){
        super(id)
    }
}

// export interface Product {
//     id: string,
//     name: string,
//     price: number,
//     categoryId: number,
//     urlImage: any[]
// }