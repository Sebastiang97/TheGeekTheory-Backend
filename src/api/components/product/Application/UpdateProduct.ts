import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class UpdateProduct {
    constructor(private productService:ProductService)
    {}

    execute(data:any, id:string): Promise<Product>{
        return this.productService.update(id, data)
    }
}