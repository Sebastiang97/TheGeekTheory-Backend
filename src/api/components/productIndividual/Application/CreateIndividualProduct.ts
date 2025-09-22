import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class CreateIndividualProduct {
    constructor(
        private productService:ProductService,
    )
    {}

    // async execute(product:Product, files: FileArray): Promise<Product>{
    async execute(product:Product): Promise<Product>{
        return this.productService.create(product)
    }
}