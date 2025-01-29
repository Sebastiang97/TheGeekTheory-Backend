import { BaseEntity } from "../../common/Domain/BaseEntity";

export class Payer extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email:string,
        public phone: string,
        public address: string,
        public zipCode: string,
        public detailAddress: string,
        public idUser?: string,
        public payments?: any[],
    ){
        super(id)
    }
}