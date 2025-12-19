import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class UpdateIndividualProduct {
    constructor(private service:ProductService)
    {}

    execute(data:any, id:string): Promise<Product>{
        return this.service.update(id, data)
    }
}