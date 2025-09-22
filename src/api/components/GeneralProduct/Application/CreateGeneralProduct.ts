import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";
// import { GeneralProductDTO } from "../Infraestructure/DTO/GeneralProductDTO";

export class CreateGeneralProduct {
    constructor(
        private generalProductService:GeneralProductService,
    )
    {}

    async execute(product:GeneralProduct): Promise<GeneralProduct>{
        return this.generalProductService.create(product)
    }
}