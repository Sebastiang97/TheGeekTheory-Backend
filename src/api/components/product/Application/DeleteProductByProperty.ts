import { ProductService } from "../Domain/ProductService";

export class DeleteProductByProperty {
    constructor(private productService:ProductService)
    {}

    execute(data: any): Promise<boolean>{
        return this.productService.deleteByProperty(data)
    }
}