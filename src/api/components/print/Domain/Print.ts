import { BaseEntity } from "../../common/Domain/BaseEntity";

export class Print extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public author: string,
        public urlImage: any[]
    ){
        super(id)
    }
}