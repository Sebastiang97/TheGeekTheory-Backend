import { ProductService } from "../../product/Domain/ProductService";


export class DeleteProductIndividual {
    constructor(
        private service:ProductService,
    )
    {}

    execute(id: string): Promise<boolean>{
        return this.service.delete(id)
    }
}