import { ProductTagService } from "../Domain/ProductTagService"

export class DeleteProductsTagsByGPId {

    constructor(private service: ProductTagService){}

    execute(id:string): Promise<boolean>{
        return this.service.deleteByProperty({
            where: {generalProductId: id}
        })
    }
}