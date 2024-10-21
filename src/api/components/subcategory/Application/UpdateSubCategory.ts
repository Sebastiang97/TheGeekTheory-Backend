import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";
import { SubCategoryReqUpdate } from "../Infraestructure/resource/SubCategoryReqUpdate";

export class UpdateSubCategory {
    constructor(
        private service:SubCategoryService,
    )
    {}

    async execute(id:string, subCategory:SubCategoryReqUpdate): Promise<SubCategory>{
        return  this.service.update(id, subCategory)
    }
}