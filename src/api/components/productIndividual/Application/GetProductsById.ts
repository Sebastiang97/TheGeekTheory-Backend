import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProductsById {
    constructor(private productService:ProductService)
    {}

    execute(ids: string[], includeURLImage:boolean = true): Promise<Product[]>{
        return this.productService.findAll({
            where: {
                id: {
                  in: ids
                }
            },
            include: {urlImage: includeURLImage}
        })
    }
}