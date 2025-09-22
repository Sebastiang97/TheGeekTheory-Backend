
export class GeneralProductDTO{
    constructor(
        public name              :string,
        public description       :string,
        public price             :number,
        public tags              :string[],
        public subCategoryId     :string,
        public categoryId        :string,
    ){
    }
}