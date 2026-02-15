import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";
// import { GeneralProductDTO } from "../Infraestructure/DTO/GeneralProductDTO";

export class GetGeneralProductsByIds {
    constructor(
        private service: GeneralProductService,
    ) { }

    async execute(ids: string[]): Promise<GeneralProduct[]> {
        return this.service.findAll({
            where: {
                id: {
                    in: ids
                }
            }
        })
    }
}
