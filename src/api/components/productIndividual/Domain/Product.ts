import { BaseEntity } from "../../common/Domain/BaseEntity";
import { ResourceImage } from "../../common/Domain/ResourceImage";

export class Product extends BaseEntity{
    constructor(
        public id                : string,
        public name              : string,
        public description       : string,
        public size              : string,
        public color             : string,
        public typeStamping      : string,
        public quantity          : number,
        public subCategoryId     : string,
        public categoryId        : string,
        public generalProductId  : string,
        public urlImage          : ResourceImage[],
    ){
        super(id)
    }
}
