import { BaseEntity } from "../../common/Domain/BaseEntity";
import { ResourceImage } from "../../common/Domain/ResourceImage";

export class Product extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public description:string,
        public price: number,
        public categoryId: string,
        public size: string,
        public color: string,
        public typeStamping:string,
        public quantity: number,
        public subCategoryId: number,
        public urlImage?: ResourceImage[],
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