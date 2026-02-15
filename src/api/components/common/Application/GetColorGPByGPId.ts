import { ColorGeneralProduct } from "../Domain/ColorGeneralProduct";
import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService";


export class GetColorGPByGPId {
    constructor(private service:ColorGeneralProductService)
    {}

    execute(gpId: string): Promise<ColorGeneralProduct[]>{
        return this.service.findAll({
            where: {
                generalProductId: gpId,
            },
          })
    }
}