import { SubCategoryService } from "../Domain/SubCategoryService";

export class DeleteSubCategoryByProperty {
    constructor(private service:SubCategoryService)
    {}

    execute(data: any): Promise<boolean>{
        return this.service.deleteByProperty(data)
    }
}