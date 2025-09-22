import { ColorGeneralProduct } from "../Domain/ColorGeneralProduct";
import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService";

export class CreateColorGeneralProduct {

    constructor(private colorGeneralProductService: ColorGeneralProductService){}

    execute(colorGeneralProduct: ColorGeneralProduct): Promise<ColorGeneralProduct>{
       return this.colorGeneralProductService.create(colorGeneralProduct)
    }

}