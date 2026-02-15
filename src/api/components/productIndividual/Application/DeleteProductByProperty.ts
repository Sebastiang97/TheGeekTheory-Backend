import { ProductService } from "../Domain/ProductService";

export class DeleteProductByProperty {
    constructor(private service:ProductService)
    {}

    execute(data: any): Promise<boolean>{
        return this.service.deleteByProperty(data)
    }
}