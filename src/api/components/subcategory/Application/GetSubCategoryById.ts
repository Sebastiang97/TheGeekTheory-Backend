import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";


export class GetSubCategoryById {
    constructor(private subCategoryService: SubCategoryService)
    {}

    execute(id: string): Promise<SubCategory[]>{
        return this.subCategoryService.findByProp({
            where: {
                id
            },
            include: {
                urlImage: true
            }
        })
    }
}