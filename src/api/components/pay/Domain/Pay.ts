import { BaseEntity } from "../../common/Domain/BaseEntity";
import { Payer } from "../../payer/Domain/Payer";
import { ProductPay } from "../../productsPay/Domain/ProductPay";

export class Pay extends BaseEntity{
    constructor(
        public id: string,
        public paymentId:string,
        public description:string,
        public amount:number,
        public state:string,
        public payerId:string,
        public payer?:Payer,
        public productsPay?:ProductPay[],
        public numberGuide?: string
    ){
        super(id)
    }
}