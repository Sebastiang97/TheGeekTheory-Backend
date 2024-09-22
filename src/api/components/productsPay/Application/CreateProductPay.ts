import { ProductPay } from "../Domain/ProductPay";
import { ProductPayService } from "../Domain/ProductPayService";

export class CreateProductsPay {
    constructor( 
        private productPayService: ProductPayService,
    )
    {}

    execute(productPay: ProductPay): Promise<ProductPay>{
        return this.productPayService.create(productPay)
    }

}