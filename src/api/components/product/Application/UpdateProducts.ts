import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class UpdateProducts {
    constructor(private productService:ProductService)
    {}

    execute(products:any[]): Promise<Product[]>{
        const res = products.map(async p=>{
            const { id, ...product } = p;
            return this.productService.update(id, product)
        })

        return Promise.all(res)
    }
}