import { BaseEntity } from "../../common/Domain/BaseEntity";

export class User extends BaseEntity{
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public picture: string,
        public googleId: string,
        public role: string
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