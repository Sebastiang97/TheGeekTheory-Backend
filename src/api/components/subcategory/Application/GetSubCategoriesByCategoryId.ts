import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";


export class GetSubCategoriesByCategoryId {
    constructor(private subCategoryService:SubCategoryService)
    {}

    execute(categoryId: string): Promise<SubCategory | null>{
        return this.subCategoryService.findByProp({
            where: {
                categoryId
            },
            include: {
                urlImage: true
            }
        })
    }
}
