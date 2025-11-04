import { BaseEntity } from "../../common/Domain/BaseEntity";

export class ProductTag extends BaseEntity{
    constructor(
        public id                : string,
        public generalProductId  : string,
        public tagId             : string
    ){
        super(id)
    }
}