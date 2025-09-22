import { BaseEntity } from "../../common/Domain/BaseEntity";

export class ColorGeneralProduct extends BaseEntity{
    constructor(
        public id                : string,
        public genreralProductId : string
    ){
        super(id)
    }
}
