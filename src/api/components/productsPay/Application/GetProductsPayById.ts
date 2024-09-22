import { ProductPay } from "../Domain/ProductPay";
import { ProductPayService } from "../Domain/ProductPayService";


export class GetProductsPayById {
    constructor(private productService:ProductPayService)
    {}

    execute(ids: string[]): Promise<ProductPay[]>{
        return this.productService.findAll({
            where: {
                id: {
                  in: ids
                }
            }
        })
    }
}