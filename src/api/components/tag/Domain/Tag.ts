import { BaseEntity } from "../../common/Domain/BaseEntity";
import { SubCategory } from "../../subcategory/Domain/SubCategory";

export class Tag extends BaseEntity{
    constructor(
        public id: string,
        public name: string,
        public displayName: string,
        public products?: SubCategory[],
    ){
        super(id)
    }
}
