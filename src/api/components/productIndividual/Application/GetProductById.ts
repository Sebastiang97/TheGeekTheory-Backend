import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProductById {
    constructor(private productService:ProductService)
    {}

    execute(id: string): Promise<Product[]>{
        return this.productService.findAll({
            where: {
                id,
            },
            include: {urlImage: true}
          })
    }
}