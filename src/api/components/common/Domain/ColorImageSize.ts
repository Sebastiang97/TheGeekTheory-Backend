import { BaseEntity } from "../../common/Domain/BaseEntity";

export class ColorImageSize extends BaseEntity{
    constructor(
        public id                : string,
        public colorIamgeId      : string,
        public size              : string
    ){
        super(id)
    }
}
