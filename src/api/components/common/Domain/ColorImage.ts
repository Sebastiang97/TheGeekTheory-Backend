import { BaseEntity } from "../../common/Domain/BaseEntity";

export class ColorImage extends BaseEntity{
    constructor(
        public id                     : string,
        public color                  : string,
        public image                  : string,
        public colorGeneralProductId  : string
    ){
        super(id)
    }
}
