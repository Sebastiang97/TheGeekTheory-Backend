import { ProductPay } from "../Domain/ProductPay";
import { ProductPayService } from "../Domain/ProductPayService";


export class GetProductPayByPayId {
    constructor(private productsPayService:ProductPayService)
    {}

    execute(
        payId: string, 
        includeURLImage:boolean = true,
        includePrints:boolean = true
    ): Promise<ProductPay[]>{
        return this.productsPayService.findByProp({
            where: {payId},
            include: {
                urlImage: includeURLImage,
                printProductPay: includePrints
            }
        })
    }
}