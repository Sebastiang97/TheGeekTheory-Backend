import { SubCategoryService } from "../Domain/SubCategoryService";


export class DeleteSubCategoryById {
    constructor(private subCategoryService:SubCategoryService)
    {}

    execute(id: string): Promise<boolean>{
        return this.subCategoryService.delete(id)
    }
}