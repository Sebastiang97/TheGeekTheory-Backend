import { BaseEntity } from "../../common/Domain/BaseEntity";

export class PrintProductPay extends BaseEntity{
    constructor(
        public id: string,
        public url: string,
        public position: string,
        public size: string,
        public productPayId: string
    ){
        super(id)
    }
}