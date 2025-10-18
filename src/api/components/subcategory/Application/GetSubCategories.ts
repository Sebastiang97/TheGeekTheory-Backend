import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";


export class GetSubCategories {
    constructor(private SubCategoryService:SubCategoryService)
    {}

    execute(): Promise<SubCategory[]>{
        return this.SubCategoryService.findAll()
    }
}