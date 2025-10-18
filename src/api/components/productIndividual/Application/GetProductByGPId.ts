import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProductByGPId {
    constructor(private productService:ProductService)
    {}

    execute(id: string, includeURLImage:boolean = true): Promise<Product[]>{
        return this.productService.findAll({
            where: {
                generalProductId: id,
            },
            include: {urlImage: includeURLImage}
          })
    }
}