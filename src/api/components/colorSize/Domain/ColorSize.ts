import { BaseEntity } from "../../common/Domain/BaseEntity";

export class ColorSize extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public code: string
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