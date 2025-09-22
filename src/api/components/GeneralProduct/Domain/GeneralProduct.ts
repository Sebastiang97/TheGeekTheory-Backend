import { BaseEntity } from "../../common/Domain/BaseEntity";
import { ResourceImage } from "../../common/Domain/ResourceImage";

export class GeneralProduct extends BaseEntity{
    constructor(
        public id                :string,
        public title             :string,
        public description       :string,
        public price             :number,
        public size              :string,
        public color             :string,
        public typeStamping      :string,
        public quantity          :string,
        public subCategoryId     :string,
        public categoryId        :string,
        public urlImage         ?:ResourceImage[],
    ){
        super(id)
    }
}