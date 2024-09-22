import { BaseEntity } from "../../common/Domain/BaseEntity";
import { Product } from "../../product/Domain/Product";

export class SubCategory extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public categoryId?: string,
        public products?: Product[],
        public urlImage?: any[]
    ){
        super(id)
    }
}