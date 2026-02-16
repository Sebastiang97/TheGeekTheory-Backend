import { BaseEntity } from "../../common/Domain/BaseEntity";
import { ColorImageSize } from "../../common/Domain/ColorImageSize";
import { ProductTag } from "../../common/Domain/ProductTag";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { Product } from "../../product/Domain/Product";

export class GeneralProduct extends BaseEntity{
    constructor(
        public id                :string,
        public title             :string,
        public description       :string,
        public price             :number,
        public size              :string,
        public color             :string,
        public code              :string,
        public typeStamping      :string,
        public quantity          :string,
        public subCategoryId     :string,
        public categoryId        :string,
        public tags              :Tag[],
        public products          :Product[],
        public colorImageSize    :ColorImageSize[],
        public urlImage         ?:ResourceImage[]
    ){
        super(id)
    }
}

type Tag = {tag : ProductTag}