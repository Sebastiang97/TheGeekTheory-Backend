import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProductsByCategoryId {
    constructor(private productService:ProductService)
    {}

    execute(categoryId: string): Promise<Product[]>{
        return this.productService.findAll({
            where: {
                categoryId: categoryId,
            },
            include: {urlImage: true}
          })
    }
}