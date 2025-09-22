import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";
// import { GeneralProductDTO } from "../Infraestructure/DTO/GeneralProductDTO";

export class GetGeneralProductsBySubcategoryId {
    constructor(
        private generalProductService:GeneralProductService,
    )
    {}

    async execute(subCategoryId:string): Promise<GeneralProduct[]>{
        return this.generalProductService.findAll({
            where: {
                subCategoryId: subCategoryId,
            },
          })
    }
}