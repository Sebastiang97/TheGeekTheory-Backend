import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProductsBySubCategoryId {
    constructor(private productService:ProductService)
    {}

    execute(subCategoryId: string): Promise<Product[]>{
        return this.productService.findAll({
            where: {
                subCategoryId: subCategoryId,
            },
            include: {urlImage: true}
          })
    }
}