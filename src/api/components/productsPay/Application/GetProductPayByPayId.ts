import { ProductPay } from "../Domain/ProductPay";
import { ProductPayService } from "../Domain/ProductPayService";


export class GetProductPayByPayId {
    constructor(private productsPayService:ProductPayService)
    {}

    execute(payId: string): Promise<ProductPay | null>{
        return this.productsPayService.findByProp({
            where: {payId}
        })
    }
}