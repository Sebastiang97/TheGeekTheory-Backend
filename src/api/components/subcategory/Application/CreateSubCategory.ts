import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";

export class CreateSubCategory {
    constructor(
        private SubCategoryService:SubCategoryService,
    )
    {}

    async execute(subCategory:SubCategory): Promise<SubCategory>{
        subCategory.code = ""
        subCategory.name
            .split(" ")
            .map(name => subCategory.code += name[0].toUpperCase())

        subCategory.code += + Date.now()
        return  this.SubCategoryService.create(subCategory)
    }
}