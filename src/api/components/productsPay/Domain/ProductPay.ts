import { BaseEntity } from "../../common/Domain/BaseEntity";
import { ResourceImage } from "../../common/Domain/ResourceImage";

export class ProductPay extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public description:string,
        public price: number,
        public size: string,
        public color: string,
        public typeStamping:string,
        public quantity: number,
        public payId: string,
        public urlImage?: ResourceImage[],
        public print?: any
    ){
        super(id)
    }
}