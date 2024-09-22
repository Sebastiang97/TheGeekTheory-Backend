import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";


export class GetSubCategoriesByCode {
    constructor(private subCategoryService:SubCategoryService)
    {}

    execute(code: string): Promise<SubCategory | null>{
        return this.subCategoryService.findByProp({
            where: {
                code
            },
            include: {
                urlImage: true
            }
        })
    }
}
