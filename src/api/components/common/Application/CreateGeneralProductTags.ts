import { Tag } from "../../tag/Domain/Tag"
import { ProductTag } from "../Domain/ProductTag"
import { ProductTagService } from "../Domain/ProductTagService"

export class CreateGeneralProductTags {

    constructor(private service: ProductTagService){}

    execute(generalProductId: string, tags: Tag[]): Promise<ProductTag[]>{
        const productsTag = tags.map(async tag=> {
            
            const productTag = await this.service.create({
                generalProductId: generalProductId,
                tagId: tag.id,
            } as ProductTag)
            return productTag
        })
        return Promise.all(productsTag)
    }
}
