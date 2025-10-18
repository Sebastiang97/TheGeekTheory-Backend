import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class GetProducts {
    constructor(private productService:ProductService)
    {}

    execute(): Promise<Product[]>{
        return this.productService.findAll({
            include: {urlImage: true}
        })
    }
}