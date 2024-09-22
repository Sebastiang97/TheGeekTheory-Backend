import { ColorSize } from "../Domain/ColorSize";
import { ColorSizeService } from "../Domain/ColorSizeService";


export class CreateProduct {
    constructor(
        private productService:ColorSizeService,
    )
    {}

    async execute(product:ColorSize): Promise<ColorSize>{
        return this.productService.create(product)
    }
}