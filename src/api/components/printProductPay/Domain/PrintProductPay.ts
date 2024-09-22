import { BaseEntity } from "../../common/Domain/BaseEntity";

export class PrintProductPay extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public author: string,
        public urlImage: any[],
        public productPayId: string
    ){
        super(id)
    }
}