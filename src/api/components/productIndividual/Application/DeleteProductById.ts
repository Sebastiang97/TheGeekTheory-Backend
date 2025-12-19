import { ProductService } from "../Domain/ProductService";

export class DeleteProductById {
    constructor(private productService:ProductService)
    {}

    execute(id: string): Promise<boolean>{
        return this.productService.delete(id)
    }
}