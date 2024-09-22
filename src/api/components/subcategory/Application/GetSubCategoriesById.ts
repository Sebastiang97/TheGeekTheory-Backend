import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";


export class GetSubCategoriesById {
    constructor(private subCategoryService:SubCategoryService)
    {}

    execute(id: string): Promise<SubCategory | null>{
        return this.subCategoryService.findById(id,{
            include: {urlImage: true}
        })
    }
}